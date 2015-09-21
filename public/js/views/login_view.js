define(function(require){
    var Template = require("text!/templates/login-modal.html");
    var User = require("models/user");
    var Dashboard = require("views/dashboard");
    var view = Backbone.View.extend({
        initialize: function(){
            this.template = Handlebars.compile(Template);
        },
        render : function(){
            this.$el.html(this.template());
            $('#login-modal').modal('show')
        },
        events : {
            "click #createAccount" : "onCreateAccountClick",
            "click #signInLink" : "onSignInClick",
            "click #registerBtn" : "onRegisterBtnClick",
            "click #loginBtn" : "onLoginBtnClick"
        },
        onSignInClick: function(){
            $("#signInContainer").removeClass("hide");
            $("#register").addClass("hide");
        },
        onCreateAccountClick: function(){
            $("#signInContainer").addClass("hide");
            $("#register").removeClass("hide");
        },
        onRegisterBtnClick: function(){
            if (this.validateRegistrationData()){
                var user = new User();
                user.save({
                        "emailId" : $("#registerEmailId").val(),
                        "password" : $("#newPassword").val()
                    },
                    {
                    success : function(obj,resp){
                        window.location.reload;
                    },
                    error : function(object, response){

                    }
                });
            }

        },
        onLoginBtnClick: function(){
            var self = this;
            if(this.validateLoginData()){
                var user = new User({
                    "emailId" : $("#inputEmail").val(),
                    "password" : $("#inputPassword").val()
                });

                user.signIn(function(response){
                    if(response.login){
                        //show dashboard
                        $('body').removeClass('modal-open')
                        window.userData = response.data;
                        if (window.localStorage){
                            window.localStorage.setItem("userData",JSON.stringify(window.userData));
                        }
                        self.loadDashboard();
                    }
                });
            }
        },
        loadDashboard: function(){
            var dashboard = new Dashboard({el:"body"});
            dashboard.loadNotes();
        },
        validateLoginData: function(){
            var emailId = $("#inputEmail");
            if (emailId.val() == "")
                return false;
            var password = this.$("#inputPassword");
            if (password.val() == "")
                return false;
            return true;
        },
        validateRegistrationData : function(){
            var emailId = $("#registerEmailId");
            if (emailId.val() == "")
                return false;
            return this.validatePassword();
        },
        validatePassword : function(){
            var password = this.$("#newPassword")[0];
            var confirmPassword = this.$("#confirmPassword")[0];
            if(password.value != confirmPassword.value) {
                confirmPassword.setCustomValidity("Passwords Don't Match");
                return false;
            } else {
                confirmPassword.setCustomValidity('');
                return true;
            }
        }
    });

    return view;
});