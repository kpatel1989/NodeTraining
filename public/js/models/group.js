define(function(require){
   
    var group = Backbone.Model.extend({
       
        urlRoot : "/groups",
        
        initialize: function(){
            
        },
        validate : function(){
            if (!this.get("name") || this.get("name") == ""){
                return false;
            }
            return true;
        }
    });
    return group;
});