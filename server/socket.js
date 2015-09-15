var io = require('socket.io')(server);
app.io = io;
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("addNote",function(note){
        
    });
});