var url = require("url"),
    GroupAssociations = require(__dirname+"/../model/group-association");

exports.all = function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var groupAssociations = new GroupAssociations();
    groupAssociations.fetchAllRequests(query.userId,function(result){
        res.json(result);
        res.end();
    });
};

exports.save = function(req,res){
    var groupAssociations = new GroupAssociations();
    groupAssociations.saveJoinRequest(req.body,function(result){
        res.json(result);
        res.end();
    });
};

exports.approve = function(req,res){
    var groupAssociations = new GroupAssociations();
    var data = {
        userId :req.body.userId,
        groupId :req.body.groupId,
        approved :req.body.approved,
        id : req.body.id
    }
    groupAssociations.approveRequest(data,function(result){
        res.json(result);
        res.end();
    });
}