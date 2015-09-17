var User = require(global.ROOT_PATH+"/model/user")

exports.all = function(req,res){
    var user = new User();
    user.fetchAll(function(resData){
        res.json(resData);
    });
};

exports.add = function(req,res){
    var user = new User();
    user.addUser(req.body,function(resData){
        res.json(resData);
    });
};

exports.login = function(req,res){
    var user = new User();
    user.authenticate({
        emailId : req.body.emailId,
        password : req.body.password
    },function(resData){
        res.json(resData);
    });
};

