const axios = require('axios');

module.exports = class HTTPHelper 
{
    async sendAsync(method, url, headers, data)
    {
        return new Promise((resolve, reject) => 
        {
            try
            {
                axios({method:method, url:url, headers:headers, data:data}).then(function(response) 
                {
                    return resolve(response?.data);
                })
                .catch(function(response) 
                {
                    return resolve(undefined);
                });
            }
            catch(e)
            {
                return resolve(undefined);
            }	
        });
    }
}