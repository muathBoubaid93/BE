module.exports = class JSON 
{
	prtinResponse(obj)
	{
        return {
            "is_successful": true,
            "error_code": "",
            "error_msg": "",
            "response": (obj) ? obj : {}
        };
    }
    
    prtinError(session, code, msg = "")
	{   
        var errorMsg = require("../lang/" + session.lang + "/common/error.json"); 

        return {
            "is_successful": false,
            "error_code": code,
            "error_msg":  (msg === '' ? errorMsg[code] : msg),
            "response": {}
        };
	}
}