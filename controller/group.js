var url = require("url"),
    Group = require(__dirname+"/../model/group");

exports.all = function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var groups = new Group();
    groups.fetchUserGroups(query.userId,function(result){
        res.json(result);
        res.end();
    });
};

exports.save = function(req,res){
    var groups = new Group();
    groups.saveGroup(req.body,function(result){
        res.json(result);
        res.end();
    });
};