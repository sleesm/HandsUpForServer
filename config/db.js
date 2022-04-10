require('dotenv').config();
var mysql = require('mysql');

const pool = {
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    connectionLimit : 0
};


module.exports = mysql.createPool(pool);