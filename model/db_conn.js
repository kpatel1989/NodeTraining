var mysql      = require('mysql-model');
var DbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : "file_sharing"
});
/*
DbConnection.prototype.connect = function(){
    this.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : ''
    });
    this.connection.connect();
}

DbConnection.prototype.disconnect = function(){
    this.connection.end();
}

DbConnection.prototype.executeQuery = function(query){
    connection.query(query, function(err, rows, fields) {
      if (err) return err;
      return rows;
    });
}

*/

module.exports = DbConnection;