const JSONHelper = require('../helper/json');
const SanitizerHelper = require('../helper/sanitizer');
const validatorHelper = require('../helper/validator');
const formatterHelper = require('../helper/formatter');
const ParentModel = require('../core/model');

function Controller(req, session, config)
{
    this.json = new JSONHelper();
    this.sanitizer = new SanitizerHelper();
    this.validator = new validatorHelper();
    this.formatter = new formatterHelper();

    this.session = session;
    this.appConfig = config;
    this.req = req;
    this.response = {};
}

Controller.prototype.createModel = function(path)
{
    var RawModel = require("./../model/" + path);

    var newModel = new RawModel();

    newModel.setSession(this.session);
    newModel.setAppConfigs(this.appConfig);

	return newModel;

	return newModel;
}

Controller.prototype.getParams = function()
{
    var req = {};

    for(var key of Object.keys(this.req))
    {
        req[key] = this.req[key];
    }

    return req;
}

Controller.prototype.getResponse = function()
{
    var response = this.json.prtinResponse(this.response);

    return response;
};

Controller.prototype.getError = function(code, msg = '')
{
    return this.json.prtinError(this.session, code, msg);
};

Controller.prototype.validate = function(key, type, ignoreIfNotSet, illegalCharacterTypeCheck, errorCode)
{
    var isValid = false;

    if (type === "IS_FILE")
    {
        if (Object.keys(this.session.files).length > 0)
        {
            if(!ignoreIfNotSet)
            {
                isValid = this.validator.isFile(this.session.files, key);
            }
            else
            {
                isValid = true;
            }
        }
        else
        {
            isValid = false;
        }
    }
    else if(key in this.req)
    {
        if (type === "NOT_EMPTY")
        {
            isValid = this.validator.isNotEmpty(this.req[key]);
        }
        else if (type === "IS_NUMERIC")
        {
            isValid = this.validator.isNumeric(this.req[key]);
        }
        else if (type === "IS_INT")
        {
            isValid = this.validator.isInt(this.req[key]);
        }
        else if (type === "IS_ARRAY")
        {
            isValid = this.validator.isArray(this.req[key]);
        }
        else if (type === "IS_OBJECT")
        {
            isValid = this.validator.isObject(this.req[key]);
        }
        else if (type === "IS_EMAIL")
        {
            isValid = this.validator.isEmail(this.req[key]);
        }
        else if (type === "IS_DATE")
        {
            isValid = this.validator.isDate(this.req[key]);
        }
        else if (type === "IS_TIME")
        {
            isValid = this.validator.isTime(this.req[key]);
        }
        else if (type === "IS_TIMESTAMP")
        {
            isValid = this.validator.isTimestamp(this.req[key]);
        }
        else if (type === "IS_FUTURE_DATE")
        {
            isValid = this.validator.isFutureDate(this.req[key]);
        }
        else if (type === "IS_STRONG_PASSWORD")
        {
            isValid = this.validator.isStrongPassword(this.req[key]);
        }
        else if(type === "IS_WEAK_PASSWORD")
        {
            isValid = this.validator.isLongPassword(this.req[key]);
        }
        else if (type === "IS_BOOLEAN")
        {
            isValid = this.validator.isBoolean(this.req[key]);
        }
        else if (type === "IS_CODE")
        {
            isValid = this.validator.isCode(this.req[key]);
        }
    }
    else
    {
        if (!ignoreIfNotSet)
        {
            isValid = false;
        }
        else
        {
            isValid = true;
        }
    }

    if(isValid && this.req[key] && illegalCharacterTypeCheck !== "" && type !== "IS_FILE" && typeof this.req[key] !== "number")
    {
        isValid = this.sanitizer.isSafeInput(this.req[key], illegalCharacterTypeCheck);
    }
    
   if(!isValid)
   {
       throw this.json.prtinError(this.session, errorCode, "");
   }
};


module.exports = Controller;