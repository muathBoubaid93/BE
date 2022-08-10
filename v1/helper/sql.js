const MySQL = require('mysql2');
const config = require('../../config');

module.exports = class SQLHelper
{
    async executeStmt(dbInfo, stmt, values, session)
    {	   
        return new Promise((resolve, reject) =>
        {
            try
            {
                var pool = (session?.sqlPool?.[dbInfo?.host + "_" + dbInfo?.database]) ? session?.sqlPool?.[dbInfo?.host + "_" + dbInfo?.database] : undefined;

                if(!session?.sqlPool?.[dbInfo?.host + "_" + dbInfo?.database])
                {
                    pool = MySQL.createPool({
                        connectionLimit: config.SQL_POOLSIZE,
                        host:dbInfo?.host,
                        user:dbInfo?.user,
                        password:dbInfo?.password,
                        database:dbInfo?.database,
                        timezone: 'Z',
                    });

                    if(!session?.sqlPool)
                    {
                        session.sqlPool = {};
                    }

                    session.sqlPool[dbInfo?.host + "_" + dbInfo?.database] = pool;
                }
                pool.query(stmt, values, function(error, results, fields)
                {
                    return (error) ? resolve(undefined) : resolve(results);
                });
            }
            catch(error)
            {
                return resolve(undefined);
            }
        });
    }
}