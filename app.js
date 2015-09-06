var express = require("express"),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    querystring = require("querystring"),
    formidable = require("formidable"),
    url = require("url"),
    router = express.Router(),
    User = require("./model/user"),
    Notes = require("./model/notes");
    Groups = require("./model/groups");
    app = express();

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
    user.find("all",{
        "where":"emailId='"+req.body.emailId+"' and password='"+req.body.password+"'"
    },function(err, result, fields){
        debugger;
        res.json({
            "login":result.length>0,
            "data": result[0]
        });
    });
});

app.get("/notes",function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query);
    var where = "userId="+query.userId;
    if(query.groupId == 'null'){
        where += " and groupId is null"
    }
    else {
        where += " and groupId =" + query.groupId
    }
    var notes = new Notes();
    notes.find("all",{
            "where" : where
        },function(err,result,fields){
        res.json(result);
        res.end();
    });
});

app.post("/notes",function(req,res){
    var notes = new Notes();
    notes.saveNote(req.body,function(resData){
        res.json(resData); 
    });
});

app.put("/notes/:id",function(req,res){
    console.log(req.body);
    var notes = new Notes();
    notes.saveNote(req.body,function(resData){
        res.json(resData); 
    });
});

app.delete("/notes/:id",function(req,res){
    var notes = new Notes();
    notes.deleteNote(req.params,function(resData){
        res.json(resData); 
    });
});

app.get("/groups",function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var groups = new Groups();
    groups.find("all",{
        "where" : "adminId="+query.userId
    },function(err,result,fields){
        res.json(result);
        res.end();
    });
});

app.post("/groups",function(req,res){
    var groups = new Groups();
    groups.saveGroup(req.body,function(resData){
        res.json(resData); 
    });
});

app.put("/groups/:id",function(req,res){
    console.log(req.body);
    var groups = new Groups();
    groups.saveGroup(req.body,function(resData){
        res.json(resData); 
    });
});

app.delete("/groups/:id",function(req,res){
    var groups = new Groups();
    groups.deleteGroup(req.params,function(resData){
        res.json(resData); 
    });
});

app.post("/uploadNotes",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        fs.readFile(files.upl.path,function(err,data){
            if (!err){
                var note = new Notes();
                note.addNote({
                    title: files.upl.name,
                    description : data
                },function(resData){
                    res.send(resData);
                });
            }
            else {
                res.send(null);
            }
        });
    });
});

app.use('/img',express.static(__dirname+ '/public/img'));
app.use('/js',express.static(__dirname+ '/public/js'));
app.use('/fonts',express.static(__dirname+ '/public/fonts'));
app.use('/css',express.static(__dirname+ '/public/css'));
app.use('/templates',express.static(__dirname+ '/public/templates'));


var server = app.listen(3000, function () {
  console.log('Server running on http://localhost:3000');
});
