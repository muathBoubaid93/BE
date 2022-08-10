const fs = require('fs');

module.exports = class TemplateHelper 
{
    async render(path, values)
    {
        return new Promise((resolve, reject) => 
        {
            try
            {
                fs.readFile(path, 'utf8', function (err,data) {
                if (err) 
                {
                    return reject(undefined);
                }
                
                Object.keys(values).forEach(key => {

                data = data.replace(new RegExp('{'+key+'}', 'g'), values[key])
                    
                })
                  
                    return resolve(data);

                  });
            }
            catch(e)
            {
                return reject(undefined);
            }	
        });
    
    }
}