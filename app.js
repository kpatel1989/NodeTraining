var Server = require("./server/server");
var Socket = require("./server/socket");
var events = require("events");
    //express = require("express"),
   /* fs = require('fs'),
    bodyParser = require('body-parser'),
    querystring = require("querystring"),
    formidable = require("formidable"),
    url = require("url"),
    _ = require("underscore"),
    User = require("./model/user"),
    Notes = require("./model/note"),
    Groups = require("./model/groups");
    GroupAssociations = require("./model/group-association");*/

global.ROOT_PATH = __dirname;
global.EventEmitter = new events.EventEmitter;
Server.start();
var socket = Socket.start(Server.app,Server.server);

/*var app = express();
app.use(bodyParser.json())
app.use('/img',express.static(__dirname+ '/public/img'));
app.use('/js',express.static(__dirname+ '/public/js'));
app.use('/fonts',express.static(__dirname+ '/public/fonts'));
app.use('/css',express.static(__dirname+ '/public/css'));
app.use('/templates',express.static(__dirname+ '/public/templates'));

var server = app.listen(3000, function () {
  console.log('Server running on http://localhost:3000');
});*/

/*
app.get('/', function (req, res) {
	 res.sendFile(__dirname+'/public/index.html');
});

app.get("/:controller/:action",function(req,res){
    var urlObj = url.parse(req.url)
    var controller = require("./controller/"+req.params.controller);
    var action = req.params.action;
    console.log(action);
    if (!controller[action]){
        res.send("Invalid keyword - "+action);
    }
    controller[action](req,res);
});

app.post("/:controller/:action",function(req,res){
    var urlObj = url.parse(req.url)
    var controller = require("./controller/"+req.params.controller);
    var action = req.params.action;
    console.log(action);
    if (!controller[action]){
        res.send("Invalid keyword - "+action);
    }
    controller[action](req,res);
});
*/
/*
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
*/
/*
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
    notes.saveNote(req.body,function(err,result){
        console.log(result);
        if(err)
            res.json(err); 
        else
            res.json({id : result.insertId});
    });
});

app.put("/notes/:id",function(req,res){
    console.log(req.body);
    var notes = new Notes();
    notes.saveNote(req.body,function(err,result){
        if (err)
            res.json(err);
        else
            res.json({id : result.insertId});
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
    var query = "select g.* "
                + "from groups g left join group_association ga "
                + " on g.id = ga.groupId"
                + " where adminId = "+query.userId
                + " or userId = "+query.userId
                + " group by g.id";
    groups.query(query,function(err,result){
        res.json(result);
        res.end(); 
    });
});

app.post("/groups",function(req,res){
    var groups = new Groups();
    groups.saveGroup(req.body,function(err,result){
        if(err)
            res.json(err); 
        else
            res.json({id : result.insertId});
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
                note.saveNote({
                    title: files.upl.name,
                    description : data,
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

app.get("/group-association",function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var groups = new Groups();
    groups.find("all",{
        "where" : "adminId="+query.userId
    },function(err,result,fields){
        var groupAssociations = new GroupAssociations();
        console.log("result");
        var ids = _.pluck(result,"id").toString();
        console.log(ids);
        var query = "SELECT ga.id,u.id as userId,u.emailId,g.name as 'groupName' ,g.id as 'groupId'"
                    + "FROM group_association ga join user u "
                    + "on ga.userId = u.id "
                    + "join groups g on ga.groupId = g.id "
                    + "WHERE groupId in ("+ ids +")  and approved = 0";
        console.log(query);
        groupAssociations.query(query,function(err,result,fields){  
            res.json(result);
            res.end();
        });
    });
});

app.post("/group-association",function(req,res){
    var groupAssociation = new GroupAssociation();
    var groups = new Groups();
    groups.find("first",{
        "where" : "name ='" + req.body.name +"'"
    },function(err,result){
        if (!err){
            var associationData = {
                groupId : result.id,
                userId : req.body.userId
            };
            groupAssociation.saveGroup(associationData,function(err,result){
                if(err)
                    res.json(err); 
                else
                    res.json({id : result.insertId});
            });
        }
        else{
            res.json(err);
        }
    });
});

app.put("/group-association",function(req,res){
    var groupAssociation = new GroupAssociation();
    groupAssociation.saveGroup({
        userId :req.body.userId,
        groupId :req.body.groupId,
        approved :req.body.approved,
        id : req.body.id
    },function(err,result){
        if(err)
            res.json(err); 
        else
            res.json({id : result.insertId});
    });
});
*/