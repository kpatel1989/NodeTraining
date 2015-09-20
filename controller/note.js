var url = require("url"),
    fs = require('fs'),
    formidable = require("formidable"),
    Note = require(__dirname+"/../model/note");

exports.all = function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    var where = "userId="+query.userId;
    if(query.groupId == 'null'){
        where += " and groupId is null"
    }
    else {
        where = "groupId =" + query.groupId
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
        if (note.get("groupId")) {
            global.EventEmitter.emit("save-note", note.toJSON());
        }
    });
};

exports.delete = function(req,res){
    var note = new Note();
    note.deleteNote({id:req.params.id},function(resData){
        res.json(resData);
        global.EventEmitter.emit("delete-note", note.toJSON());
    });
};