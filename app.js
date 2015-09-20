var Server = require("./server/server");
var Socket = require("./server/socket");
var events = require("events");

global.ROOT_PATH = __dirname;
global.EventEmitter = new events.EventEmitter;
Server.start();
var socket = Socket.start(Server.app,Server.server);