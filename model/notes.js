var DbConn = require("./db_conn");
Notes = DbConn.extend({
    tableName : "notes"
});

Notes.prototype.saveNote = function(data,callback){   
    this.set(data);
    this.save(callback);
}
Notes.prototype.deleteNote = function(data,callback){   
    this.set(data);
    this.remove(callback);
}

module.exports = Notes;