const Config = require('../../config');
const HTTPHelper = require('../helper/http');
const SQLHelper = require('../helper/sql');
const env = require('../../env.json');

function Model() {}

var conn = undefined;
var client = undefined;

Model.prototype.setSession = function(session)
{
    this.session = session;
};


Model.prototype.setAppConfigs = function(appConfig)
{
    this.appConfig = appConfig;
};

Model.prototype.executeSQLStmt = async function(stmt, values, name="MAIN")
{
    var dbInfo =  dbInfo = {
        "host":Config.DATABASE_HOST_NAME,
        "database":Config.DATABASE_NAME,
        "user":Config.DATABASE_USERNAME,
        "password":Config.DATABASE_PASSWORD,
        "dateStrings":true
    };

    const sqlHelper = new SQLHelper();

    return await sqlHelper.executeStmt(dbInfo, stmt, values, this.session);
};


Model.prototype.sendHTTP = async function(method, url, headers, data)
{
    const http = new HTTPHelper();

    return await http.sendAsync(method, url, headers, data);
}

module.exports = Model;