var DbConn = require("./db_conn");
User = DbConn.extend({
    tableName : "user"
});

User.prototype.addUser = function(data,callback){
    
    this.set(data);
    this.save(callback);
}

module.exports = User;