const Controller = require('../../core/controller');
var CryptoJS = require("crypto-js");


module.exports = class Account extends Controller
{
    constructor(req, session, config)
    {
        super(req, session, config);
    }
    
    async getUsersInfo()
    {
        const userModel = this.createModel('user/account');

        var key = await userModel.getKey();

        if(key)
        {
            var users = await userModel.getAllUsers();
            
            if(users[0]?.username)
            {
                var data = [];

                for(var user of users)
                {
                    var temp = {};
        
                    for(var objKey of Object.keys(user))
                    {
                        var ciphertext = CryptoJS.AES.encrypt(user[objKey], key).toString();
                        temp[objKey] = ciphertext;
                    }
        
                    data.push(temp);
                }
        
                this.response = data;
                return this.getResponse();
            }
            else
            {
                return this.getError(1011);
            }  
        }
        else
        {
            return this.getError(1011);
        }
    }

    async generateKey()
    {
        const userModel = this.createModel('user/account');

        var key = await userModel.generateKey();

        this.response = {key:key};
        return this.getResponse();
    }
}