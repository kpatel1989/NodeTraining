var mysql      = require('mysql-model');
var DbConnection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : "pin_notes"
});

module.exports = DbConnection;