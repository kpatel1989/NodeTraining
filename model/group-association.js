var DbConn = require("./db_conn");
GroupAssociation = DbConn.extend({
    tableName : "group_association"
});

GroupAssociation.prototype.saveGroup = function(data,callback){   
    this.set(data);
    this.save(callback);
}

module.exports = GroupAssociation;