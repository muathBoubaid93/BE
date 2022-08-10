const { userInfo } = require('os');
const Model = require('../../core/model');

module.exports = class AccountModel extends Model
{
    async generateKey()
    {
        try
        {
            var keys = await this.executeSQLStmt("SELECT * FROM `key` WHERE `is_active` = ?", [1]);

            var shouldCreateNewKey = false;
    
            if(keys[0]?.key_id)
            {
                var code = keys[0]?.key

                var lastKeyCreatedAt = keys[0]?.created_at;
    
                var nowDateObj = new Date(new Date().toUTCString());
                    
                var diff = Math.abs(nowDateObj - lastKeyCreatedAt) / 60000;
             
                if(diff > 360)
                {
                    shouldCreateNewKey = true;
                }
    
                if(shouldCreateNewKey)
                {
                    var code = Math.random().toString(36).substring(2,7) + Date.now();
    
                    await this.executeSQLStmt("UPDATE `key` SET `is_active` = ?", [0]);
                    await this.executeSQLStmt("INSERT INTO `key` SET `key` = ?", [code]);
    
                }
    
                return code;
            }
            
            return undefined;
    
        }
        catch(e)
        {
            return undefined;
        }
       
    }

    async getAllUsers()
    {
        try
        {
            var userInfo = await await this.executeSQLStmt("SELECT `username`, `email`, `mobile` FROM `user`", []);

            return userInfo[0]?.username ? userInfo : [];
        }
        catch(e)
        {
            return [];
        }
    }

    async getKey()
    {
        try
        {
            var keys = await this.executeSQLStmt("SELECT * FROM `key` WHERE `is_active` = ? LIMIT 1", [1]);
            
            return keys[0]?.key ?? undefined

        }
        catch(e)
        {
            return undefined
        }
    }
}