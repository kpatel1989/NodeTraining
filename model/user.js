var DbConn = require("./db_conn");
User = DbConn.extend({
    tableName : "user"
});

User.prototype.addUser = function(data){
    
    this.set(data);
    this.save();
    debugger;
    /*var data = this.read();
    console.log(data);
    */
    return {};
    
}

module.exports = User;