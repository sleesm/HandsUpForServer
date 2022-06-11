const poolPromise = require('../config/db.js');

module.exports = {
    queryParam: async (query, value) => {
        const pool = await poolPromise;
        return new Promise(function(resolve, reject) {
            pool.getConnection(function(err,connection){ //pool connection
                if (err) reject(err);
                connection.query(query, value, function(err, result) { // query
                    if (err) reject(err);
                    connection.release();
                    resolve(result);
                });
            })
        });
    }
}