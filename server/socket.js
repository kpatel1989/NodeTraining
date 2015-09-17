var _ = require("underscore"),
    Groups = require("../model/group");

exports.start = function(app,server){
    var io = require('socket.io')(server);
    app.io = io;
    /*io.on('connection', function(socket){
        console.log('a user connected');

    });*/
    var rooms = [];
    (new Groups).fetchAll(function(groups){
        _.each(groups,function(group){
            rooms[group.id] = io.of("/"+group.name);
            rooms[group.id].on("connection",function(socket){
            });
        });
    });
    var emitter = global.EventEmitter;
    emitter.on("note", function (data) {
        rooms[data.groupId].emit("noteData",data);
    });
    exports.io = io;
};
