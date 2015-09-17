var DbConn = require("./db_conn");
Groups = DbConn.extend({
    tableName : "groups"
});
Groups.prototype.fetchAll = function(callback){
    this.find(function(err,result){
        callback(err ? [] : result);
    });
};
Groups.prototype.fetchUserGroups = function(userId,callback){
    var query = "select g.* "
        + "from groups g left join group_association ga "
        + " on g.id = ga.groupId"
        + " where adminId = " + userId
        + " or userId = "+ userId
        + " group by g.id";
    this.query(query,function(err,result){
        callback(err ? err : result);
    });
};

Groups.prototype.fetchWhere = function(whereCondition,callback){
    this.find("all",whereCondition,function(err,result){
        callback(err ? [] : result);
    });
};
Groups.prototype.fetchOne = function(whereCondition,callback){
    this.find("first",whereCondition,function(err,result){
        callback(err ? {}: result);
    });
};
Groups.prototype.saveGroup = function(data,callback){
    this.set(data);
    this.save(function(err,result) {
        callback(err || {id : result.insertId});
    });
};
Groups.prototype.deleteGroup = function(data,callback){
    this.set(data);
    this.remove(function(err,result) {
        callback(err || {id : result.insertId});
    });
};

module.exports = Groups;