var url = require("url"),
    Note = require(__dirname+"/../model/note");

exports.all = function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    var where = "userId="+query.userId;
    if(query.groupId == 'null'){
        where += " and groupId is null"
    }
    else {
        where += " and groupId =" + query.groupId
    }
    
    var note = new Note();
    note.fetchWhere(where,function(resData){
        res.json(resData);
    });
};

exports.save = function(req,res){
    var note = new Note();
    note.saveNote(req.body,function(resData){
        res.json(resData);
    });
};