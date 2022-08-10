const Model = require('../core/model');

module.exports = class SettingsHelper extends Model
{    
    async getAll()
    {
        var settings = {};

        try
        {
            var rows = await this.executeSQLStmt("SELECT * FROM `settings`", [], "SETTINGS");
        
            if(rows && Array.isArray(rows))
            {
                rows.forEach(row =>
                {
                    settings[row.key] = row.value;
                });
            }
    
            return settings;
        }
        catch(e)
        {
            return {};
        }	        
    }
}