require('dotenv').config();
var mysql = require('mysql');

var db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
});

db.connect();
console.log("success DB connection");
module.exports = db;
