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
    var group = new Group();
    group.saveGroup(req.body,function(result){
        res.json(result);
        res.end();
        global.EventEmitter.emit("save-group", group.toJSON());
    });
};

exports.delete = function(req,res){
    var group = new Group();
    group.deleteGroup({id:req.params.id},function(resData){
        res.json(resData);
        global.EventEmitter.emit("delete-group", note.toJSON());
    });
};



exports.delete = function(req,res){
    var groups = new Group();
    groups.deleteGroup(req.body,function(resData){
        res.json(resData);
    });
};