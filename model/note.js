var DbConn = require("./db_conn");
Notes = DbConn.extend({
    tableName : "notes"
});

Notes.prototype.saveNote = function(data,callback){   
    this.set(data);
    this.save(function(err,result,fields){
            callback(err ? err : {id:data.id || result.insertId});
    });
};
Notes.prototype.deleteNote = function(data,callback){   
    this.set(data);
    this.remove(function(err,result,fields){
            callback(err ? err : {id:data.id});
    });
};
Notes.prototype.fetchWhere = function(where,callback){
    this.find("all",{
            "where" : where
        },function(err,result,fields){
            callback(err ? err : result);        
    });
};

module.exports = Notes;