const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const env = require('./env.json');
const fs = require('fs');
const requestIP = require('request-ip');
const is_ip_private = require('private-ip');
const useragent = require('express-useragent');

app.use(bodyParser.json({limit: config.REQUEST_PAYLOAD_SIZE + 'mb'}));
app.use(bodyParser.urlencoded({limit: config.REQUEST_PAYLOAD_SIZE + 'mb',
							   extended: true, 
							   parameterLimit: config.REQUEST_PAYLOAD_SIZE*1000}));
app.use(express.static('public'));
app.use(useragent.express());

var uniqueUploadID = Date.now() + "_" + Math.floor(Math.random() * 10000);

var filesUploaded = {};

var filesUploader = multer(
{
	storage: multer.diskStorage(
	{
		destination: (req, file, cb) =>
		{
			cb(null, config.UPLOAD_FILE_TEMP_DIRECTORY)
		},
		filename: (req, file, cb) =>
		{
			var filename = (uniqueUploadID + "_" + file.fieldname + "_" + file.originalname).toLocaleLowerCase();

			filesUploaded[file.fieldname] = config.UPLOAD_FILE_TEMP_DIRECTORY + "/" + filename;

			cb(null, filename)
		},
	}),
	limits:
	{
		fileSize: config.UPLOAD_FILE_MAX_SIZE_IN_MB * 1000 * 1000
	},
	fileFilter: function(req, file, cb)
	{
		if (config.UPLOAD_FILE_SUPPORTED_MIMES.indexOf(file.mimetype) !== -1)
		{
			cb(null, true);
		}
		else
		{
			req.fileValidationError = true;
			cb(null, false, new Error());
		}
	}
})

app.all('/:microservice/:version/:folder/:file/:method', filesUploader.any('files', config.UPLOAD_FILE_MAX_FILES_PER_REQUEST), (req, res, next) =>
{  
	processRequest(req.params.version, req.params.folder, req.params.file, req.params.method, req, res, next, req.app.locals);
})


app.all('/:version/:folder/:file/:method', filesUploader.any('files', config.UPLOAD_FILE_MAX_FILES_PER_REQUEST), (req, res, next) =>
{ 
	processRequest(req.params.version, req.params.folder, req.params.file, req.params.method, req, res, next, req.app.locals);
})

function processRequest(requestAPIVersion, requestFolder, requestFile, requestMethod, req, res, next, appLocals)
{    
	var headerToken = (req.header('x-api-token') !== undefined) ? req.header('x-api-token') : "";
	var headerLanguage = (req.header('x-api-lang') !== undefined) ? req.header('x-api-lang') : config.DEFAULT_LANGUAGE;
	var headerAppVersion = (req.header('x-api-version') !== undefined) ? parseFloat(req.header('x-api-version')) : 0;
	var headerEndpoint = (req.header('x-api-endpoint') !== undefined) ? req.header('x-api-endpoint') : "";

	var errorLanguage = (config.SUPPORTED_LANGUAGES.includes(headerLanguage.toLowerCase())) ? headerLanguage : config.DEFAULT_LANGUAGE;
	var errorVersion = config.DEFAULT_VERSION;
	
	var clientIP = requestIP.getClientIp(req); 
	if (clientIP.substr(0, 7) == "::ffff:")
	{
		clientIP = clientIP.substr(7)
	}
	
	const errorCodes = require('./' + errorVersion + '/lang/' + errorLanguage + '/common/error.json');

	var isPrivateRequest = is_ip_private(clientIP);

	
	var hasValidFiles = true;

	for(var key of Object?.keys(filesUploaded))
	{
		var isValidFile = validateFileContent(filesUploaded[key]);

		if(!isValidFile)
		{
			hasValidFiles = false;
			break;
		}
	}
	

	if(!hasValidFiles)
	{
		clearTempFile(filesUploaded);
		res.send(handellError(1013, errorCodes[1013]));
	}
	else if(!isPrivateRequest && !isExposedRequest && isNaN(headerAppVersion))
	{
		clearTempFile(filesUploaded);
		res.send(handellError(1000, errorCodes[1000]));
	}
	else if(!isPrivateRequest && !isExposedRequest && !config.SUPPORTED_LANGUAGES.includes(headerLanguage.toLowerCase()))
	{
		clearTempFile(filesUploaded);
		res.send(handellError(1002, errorCodes[1002]));
	}
	else if(!isPrivateRequest && !isExposedRequest && !config.SUPPORTED_ENDPOINTS.includes(headerEndpoint.toLowerCase()) && env.code.toUpperCase() != "DEV" )
	{
		clearTempFile(filesUploaded);
		res.send(handellError(1019, errorCodes[1019]));
	}
	else
	{
		if (req.fileValidationError)
		{
			clearTempFile(filesUploaded);
			res.send(handellError(1013, errorCodes[1013]));
		}
		else
		{
			try
			{
				const path = requestAPIVersion + '/controller/' + requestFolder + '/' + requestFile + '.js';
	
				if (fs.existsSync(path))
				{
					var service = require('./' + path);


					var newSession = appLocals;

					
					newSession.lang           = headerLanguage;
					newSession.token          = headerToken;
					newSession.request_data   = req.body;
					newSession.ip             = clientIP;
					newSession.app_name       = config.APP_NAME;
					newSession.files          = filesUploaded;
					newSession.api_version    = requestAPIVersion;
					newSession.uri         	  = requestFolder + '/' + requestFile + '/' + requestMethod;
					newSession.useragent      = req.useragent; 
					newSession.request_header = req.headers;       

					var serviceObject = new service(req.body, newSession, {...config, env:env});
					
					if(serviceObject && serviceObject[requestMethod] !== undefined && serviceObject[requestMethod] !== null)
					{          
						try
						{
							
								const minAppVersion = 188;

								var hasValidAppVersion = false;
								
								if(config.SUPPORTED_ENDPOINTS_WITHOUT_VERSIONING.includes(headerEndpoint.toLowerCase()))                      
								{
									hasValidAppVersion = true;
								}
								else
								{
									hasValidAppVersion = (
														  (isPrivateRequest) || 
														  (isExposedRequest) || 
														  (config.APP_IS_AUTONOMOUS_SERVER) || 
														  (settings.CONFIG_APP_MIN_VERSION && !isNaN(minAppVersion) && minAppVersion <= headerAppVersion)
														 )    
								}
								
								if(req.useragent.isBot === false || config.APP_IS_DEMON_SERVER === true)
								{
									if(hasValidAppVersion)
									{
										serviceObject[requestMethod]().then(data =>
										{
						
											Object.keys(filesUploaded).forEach(element =>
											{
												if (fs.existsSync(filesUploaded[element]))
												{
													fs.unlinkSync(filesUploaded[element], resultHandler);
												}
											});
																																	
											
											clearTempFile(filesUploaded);
											res.send(data);
											

											
											
										}).catch((error)=>
										{
											if(error?.error_code !== undefined && error?.error_msg !== undefined)
											{
												res.send(error);
											}
											else if(error?.stack)
											{
												console.log(error);
												res.send(handellError(1005, errorCodes[1005]));
											}
											else
											{
												console.log(error);
												res.send(handellError(1005, errorCodes[1005]));
											}

										
										});                                   
									}
									else
									{
										console.log(error);
										res.send(handellError(1001, errorCodes[1001]));
									}
								}
								else
								{
									console.log(error);
									res.send(handellError(1018, errorCodes[1018]));

								}                    
							
						}
						catch (error)
						{	
							console.log(error);
							res.send(handellError(1005, errorCodes[1005]));
						}
					}
					else
					{
						res.send(handellError(1006, errorCodes[1006]));
					}
				}
				else
				{
					res.send(handellError(1004, errorCodes[1004]));
				}
			}
			catch (error)
			{
				console.log(error);
				res.send(handellError(1005, errorCodes[1005]));		
			}
		}
	}
}

app.all('*', (req, res) =>
{
	var code = 1007;
	var msg = "Invalid URI Structure";
	res.send(handellError(code, msg));
})

const server = app.listen(env.port, () =>
{
	console.log(`${config.APP_NAME} is running at http://localhost:${env.port}`)
})


function handellError(code, msg)
{
	var json =
	{
		"is_successful": false,
		"error_code": code,
		"error_msg": msg,
		"response": {}
	}

	return json;
}

function clearTempFile(files)
{
	Object.keys(files).forEach(key =>
	{
		if (fs.existsSync(files[key]))
		{
			fs.unlinkSync(files[key]);
		}
	});
}

function validateFileContent(file)
{
	if (fs.existsSync(file))
	{
		try
    	{
        	let ext = file.split('.').pop();
        
			if(config?.SUPPORTED_FILES.includes(ext?.toLowerCase()))
			{
				if(["png", "jpg", "jpeg", "gif"].includes(ext?.toLowerCase()))
				{
					try
					{
						var buffuer = fs?.readFileSync(file);   
						var data    =  buffuer?.toString('hex');

						return (data?.includes("ffd8ff") || data?.includes("47494638") || data?.includes("89504e470d0a1a0a") || data?.includes("424d"));
					}
					catch(e)
					{
						return false;
					}   
				}
				else if(["quicktime","mp4","mov"].includes(ext?.toLowerCase()))
				{
					var buffuer = fs?.readFileSync(file);   
					var data    =  buffuer?.toString('hex');

					return (data.includes("6674797069736F6D") || data.includes("6674797033677035") || data.includes("667479704d534e56") || data.includes("667479706d703432") || data.includes("6674797071742020") || data.includes("6D6F6F76"));
				}
				else
				{
					return false;
				}
			}
			else
			{
				return false;
			}
		}
		catch(e)
		{
			return false;
		}
	}

	return true;
}

// to test the Jest packages
module.exports = app;

module.exports = server;