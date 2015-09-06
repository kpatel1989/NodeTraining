var DbConn = require("./db_conn");
Groups = DbConn.extend({
    tableName : "groups"
});

Groups.prototype.saveGroup = function(data,callback){   
    this.set(data);
    this.save(callback);
}
Groups.prototype.deleteGroup = function(data,callback){   
    this.set(data);
    this.remove(callback);
}

module.exports = Groups;