const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host:'34.132.157.200',
        user: 'root',
        password:'iD8lNuph1e8Onrb7',
        database:'se3316_lab3'
    });
    return conn;
}
module.exports = newConnection;
