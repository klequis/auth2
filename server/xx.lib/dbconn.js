import mysql from 'mysql';
const connection   = mysql.createConnection({
  supportBigNumbers: true,
  bigNumberStrings: true,
  host     : "localhost",
  user     : "root",
  password : "karl",
  database : "db_users"
});

module.exports = connection;
