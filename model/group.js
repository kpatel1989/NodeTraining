var DbConn = require("./db_conn"),
    GroupAssociations = require("./group-association");

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
        if (err) callback(err);
        var groupData = [];
        var groupAssociations = new GroupAssociations();
        var getUsers = function(groups,index,funCallback){
            groupAssociations.fetchUserByGroup(groups[index].id,function(result){
                groups[index]["users"] = result;
                if (groups.length-1 > index) {
                    getUsers(groups,index+1,funCallback);
                }
                else {
                    funCallback(groups);
                }
            });
        };
        if (result.length>0) {
            getUsers(result,0,callback);
        }
        //callback(err ? err : result);
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
    var self = this;
    this.save(function(err,result) {
        callback(err || {id : self.id || result.insertId});
    });
};
Groups.prototype.deleteGroup = function(data,callback){
    this.set(data);
    var self = this;
    this.remove(function(err,result) {
        callback(err || {id : self.id});
    });
};

exports.init = Groups;