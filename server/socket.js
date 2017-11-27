var _ = require("underscore"),
    Groups = require("../model/group");

exports.start = function(app,server){
    var io = require('socket.io')(server);
    app.io = io;
    /*io.on('connection', function(socket){
        console.log('a user connected');

    });*/
    var rooms = [];
    (new Groups.init).fetchAll(function(groups){
        _.each(groups,function(group){
            rooms[group.id] = io.of("/"+group.name);
            //rooms[group.id].on("connection",function(){});
        });
    });
    var emitter = global.EventEmitter;
    emitter.on("save-note", function (data) {
        rooms[data.groupId].emit("noteData",data);
    });
    emitter.on("delete-note", function (data) {
        console.log(data);
        rooms[data.groupId].emit("deleteNote",data);
    });
    emitter.on("save-group", function (data) {
        if (!rooms[data.id]){
            console.log("room created-",data.name);
            rooms[data.id] = io.of("/"+data.name);
        }
    });
    exports.io = io;
};
