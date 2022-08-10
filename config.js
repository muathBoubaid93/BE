const env = require('./env.json');

const dev =
{
	
	"DATABASE_HOST_NAME": "database-main.cmgot7ftcaew.eu-west-3.rds.amazonaws.com",
	"DATABASE_NAME": "user",
	"DATABASE_USERNAME": "admin",
	"DATABASE_PASSWORD": "User#123",


	"AWS_ACCESS_KEY_ID": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_ACCESS_SECRET": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_SMS_REGION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_EMAIL_REGION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_S3_REGION": "me-south-1",
	"AWS_S3_VERSION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_S3_BUCKET": "xx-xx.xxxx.xxxx",
	"AWS_S3_URL": "xx-xx.xxxx.xxxx",
	
};

const preprod =
{
	"DATABASE_HOST": "database-main.cmgot7ftcaew.eu-west-3.rds.amazonaws.com",
	"DATABASE_DATABASE": "user",
	"DATABASE_USERNAME": "admin",
	"DATABASE_PASSWORD": "User#123",


	"AWS_ACCESS_KEY_ID": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_ACCESS_SECRET": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_SMS_REGION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_EMAIL_REGION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_S3_REGION": "me-south-1",
	"AWS_S3_VERSION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_S3_BUCKET": "xx-xx.xxxx.xxxx",
	"AWS_S3_URL": "xx-xx.xxxx.xxxx",
};

const prod =
{
	"DATABASE_HOST": "database-main.cmgot7ftcaew.eu-west-3.rds.amazonaws.com",
	"DATABASE_DATABASE": "user",
	"DATABASE_USERNAME": "admin",
	"DATABASE_PASSWORD": "User#123",


	"AWS_ACCESS_KEY_ID": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_ACCESS_SECRET": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_SMS_REGION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_EMAIL_REGION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_S3_REGION": "me-south-1",
	"AWS_S3_VERSION": "xxxxxxxxxxxxxxxxxxxxxx",
	"AWS_S3_BUCKET": "xx-xx.xxxx.xxxx",
	"AWS_S3_URL": "xx-xx.xxxx.xxxx",

};

const config = (env.code.toUpperCase() === 'PROD') ? prod : (env.code.toUpperCase() === 'PREPROD') ? preprod : dev;

module.exports =
{
	...config,

	"FRAMEWORK_AUTHOR": "main",
	"FRAMEWORK_VERSION": 2.9,

	"APP_NAME": "MAIN",
	"APP_CODE": "MAIN",
	"APP_IS_AUTONOMOUS_SERVER": true,
	"APP_IS_DEMON_SERVER": true,
	"APP_ENV":env.code.toUpperCase(),
	
	"DEFAULT_LANGUAGE": "ar",
	"DEFAULT_VERSION": "v1",
	"DEFAULT_CACHE_TYPE":"REMOTE",
	
	"SUPPORTED_LANGUAGES": ["en", "ar"],
	"SUPPORTED_VERSIONS": ["v1"],
	"SUPPORTED_ENDPOINTS": ["ios", "android", "web"],
	"SUPPORTED_ENDPOINTS_WITHOUT_VERSIONING": ["web"],
	"SUPPORTED_FILES": ["png", "jpg", "jpeg", "gif", "mp4", "mov", "quicktime"],
	"SUPPORTED_ROLES": ["admin", "maintainer", "observer"],
	"SUPPORTED_ENV": ["dev", "preprod", "prod"],
	"SUPPORTED_CACHE_TYPES": ["REMOTE", "LOCALIZED"],

	"UPLOAD_FILE_MAX_SIZE_IN_MB": 5,
	"UPLOAD_FILE_MAX_FILES_PER_REQUEST": 5,
	"UPLOAD_FILE_SUPPORTED_MIMES": ["image/png", "image/gif", "image/jpeg", "image/jpg","video/mp4","video/quicktime"],
	"UPLOAD_FILE_RESIZE_TO_HEIGHT": 250,
	"UPLOAD_FILE_RESIZE_TO_WIDTH": 250,
	"UPLOAD_FILE_TEMP_DIRECTORY": "./temp",

	"ENFORCED_HTML_RESPONSES" : [],
	"EXPOSED_RESPONSES" : [],
		
	"REQUEST_PAYLOAD_SIZE": 10,

	"SQL_POOLSIZE": 10,

	"SALT": "xxxxxxxx",
	"PEPPER": "xxxxxx",
	
	"PRELOGIN_SALT" : "xxxxxxxx",
	"PRELOGIN_PEPPER" : "xxxxxxxx",

	"DATABASE_TYPE_TOKEN":"sql",


	"VALIDATION_TYPES":
	[
		"IS_NUMERIC",
		"NOT_EMPTY",
		"IS_INT",
		"IS_ARRAY",
		"IS_OBJECT",
		"IS_EMAIL",
		"IS_DATE",
		"IS_TIME",
		"IS_TIMESTAMP",
		"IS_FUTURE_DATE",
		"IS_STRONG_PASSWORD",
		"IS_WEAK_PASSWORD",
		"IS_FILE"
	]
}
