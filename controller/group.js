var url = require("url"),
    Group = require(__dirname+"/../model/group");

exports.all = function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var groups = new Group.init();
    groups.fetchUserGroups(query.userId,function(result){
        res.json(result);
        res.end();
    });
};

exports.save = function(req,res){
    var group = new Group.init();
    group.saveGroup(req.body,function(result){
        group.set("id",result.id || result.insertId);
        global.EventEmitter.emit("save-group", group.toJSON());
        res.json(result);
        res.end();
    });
};

exports.delete = function(req,res){
    var group = new Group.init();
    group.deleteGroup({id:req.params.id},function(resData){
        res.json(resData);
        global.EventEmitter.emit("delete-group", group.toJSON());
    });
};