var DbConn = require("./db_conn");
Notes = DbConn.extend({
    tableName : "notes"
});

Notes.prototype.addNote = function(data,callback){
    
    this.set(data);
    this.save(callback);
}

module.exports = Notes;