var http = require("http"),
    express = require("express"),
    bodyParser = require('body-parser'),
    router = require("../route/router");

function start() {
    var app = express();
    app.use(bodyParser.json())
    app.use('/img',express.static(global.ROOT_PATH+ '/public/img'));
    app.use('/js',express.static(global.ROOT_PATH+ '/public/js'));
    app.use('/fonts',express.static(global.ROOT_PATH+ '/public/fonts'));
    app.use('/css',express.static(global.ROOT_PATH+ '/public/css'));
    app.use('/templates',express.static(global.ROOT_PATH+ '/public/templates'));
    app.use("/",router);
    var server = app.listen(3000, function () {
        console.log('Server running on http://localhost:3000');
    });
    
    return server;
}

exports.start = start;