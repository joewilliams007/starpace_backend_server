mysql = require('mysql'); // Database connection

var connection = mysql.createConnection({
    host:   '127.0.0.1',
    user: 'root',
    password: 'johannw2004',
    database: 'db_starspace',
    charset: 'utf8mb4',
    dateStrings: true
});

connection.connect();
module.exports = connection;
