var _ = require("underscore"),
    Groups = require("../model/group");

exports.start = function(app,server){
    var io = require('socket.io')(server);
    app.io = io;
    io.on('connection', function(socket){
        console.log('a user connected');

    });
    (new Groups).fetchAll(function(groups){
        var rooms = [];
        _.each(groups,function(group){
            rooms[group.id] = io.of("/"+group.name);
            rooms[group.id].on("connection",function(socket){
                //console.log("someone joined the group.",socket);
            });
            rooms[group.id].on("change",function(data){
                //console.log("change",data);
            });
        });
    });
    exports.io = io;
};
