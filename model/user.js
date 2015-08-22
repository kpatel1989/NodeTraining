var DbConn = require("./db_conn");
User = DbConn.extend({
    tableName : "user"
});

User.prototype.addUser = function(data){
    
    this.set(data);
    this.save();
}

module.exports = User;