define(function(require){
    var user = Backbone.Model.extend({

        url : function(){
            return "/user/add";  
        },
        sigInUrl : function(){
            return "/user/login";
        },
        initialize: function(){

        },

        signIn : function(callback){
            $.ajax(this.sigInUrl(),{
                method : "POST",
                contentType:"application/json",
                data : JSON.stringify(this.toJSON()),
                success : callback
            });
        }
    });
    return user;
});