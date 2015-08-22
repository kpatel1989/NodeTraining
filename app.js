var express = require("express"),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    app = express(),
    router = express.Router(),
    User = require("./model/user");


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

app.post("/login/",function(req,res){
    console.log(req.body);
    var user = new User();
    user.find("count",{
        "where":"emailId='"+req.body.emailId+"' and password='"+req.body.password+"'"
    },function(err, result, fields){
        res.json({"login":result>0});
    });
});

app.post("/user",function(req,res){
    var user = new User();
    var resData = user.addUser(req.body);
    res.json(resData);
});

app.put("/user",function(req,res){
   console.log(res); 
    //res.send("Ok");
});

app.use('/img',express.static(__dirname+ '/public/img'));
app.use('/js',express.static(__dirname+ '/public/js'));1
app.use('/css',express.static(__dirname+ '/public/css'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server running on http://%s:%s', host, port);
});
1