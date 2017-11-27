define(function(require){
    return function(){
        var LoginView = require("views/login_view");
        $("#createAccount").click(function(){    		
            $("#signInContainer").addClass("hide");
            $("#register").removeClass("hide");
        });
        var view = new LoginView({el : "body"});
    }
});