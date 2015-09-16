var DbConn = require("./db_conn");

User = DbConn.extend({
    tableName : "user"
});

User.prototype.addUser = function(data,callback){
    this.set(data);
    this.save(function(err, result, fields){
        callback(err ? err : {id:result.insertId});
    });
}

User.prototype.fetchAll = function(callback){
    this.find(function(err, result, fields){    
        callback(err ? err : result);
    });
}

User.prototype.authenticate = function(loginData,callback){
    this.find("all",{
        "where":"emailId='"+loginData.emailId+"' and password='"+loginData.password+"'"
    },function(err, result, fields){
        callback(err? err: {
            "login":result.length>0,
            "data": result[0]
        });
    });
}
module.exports = User;