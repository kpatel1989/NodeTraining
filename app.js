var express = require("express"),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    app = express(),
    router = express.Router(),
    User = require("./model/user"),
    Notes = require("./model/notes");

app.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	 res.sendFile(__dirname+'/public/index.html');
});

app.get("/users",function(req,res){
    var user = new User();
    user.find(function(err, result, fields){    
        res.json(result);
        res.end();
    });
});

app.post("/user",function(req,res){
    var user = new User();
    user.addUser(req.body,function(resData){
        res.json(resData);
    });
});

app.post("/login",function(req,res){
    var user = new User();
    user.find("count",{
        "where":"emailId='"+req.body.emailId+"' and password='"+req.body.password+"'"
    },function(err, result, fields){
        debugger;
        res.json({"login":result>0});
    });
});

app.get("/notes",function(req,res){
    var notes = new Notes();
    notes.find(function(err,result,fields){
        res.json(result);
        res.end();
    });
});

app.post("/notes",function(req,res){
    var notes = new Notes();
    notes.addNote(req.body,function(resData){
        res.json(resData); 
    });
});

app.post("/uploadNotes",function(req,res){
    console.log(JSON.stringify(req.files));
});

app.use('/img',express.static(__dirname+ '/public/img'));
app.use('/js',express.static(__dirname+ '/public/js'));
app.use('/fonts',express.static(__dirname+ '/public/fonts'));
app.use('/css',express.static(__dirname+ '/public/css'));
app.use('/templates',express.static(__dirname+ '/public/templates'));


var server = app.listen(3000, function () {
  console.log('Server running on http://localhost:3000');
});
1