LoginView = Backbone.View.extend({
    
    initialize: function(){
        
    },
    
    events : {
        "click #createAccount" : "onCreateAccountClick",
        "click #registerBtn" : "onRegisterBtnClick",
        "click #login" : "onLoginBtnClick",
        "click #signInLink" : "onSignInClick"
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
                    console.log(resp);
                    window.location.reload;
                },
                error : function(object, response){
                    console.log(response);
                }
            });
        }
            
    },
    onLoginBtnClick: function(){
        
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
})