define(function(require){
   
    var groupAssociation = Backbone.Model.extend({
       
        urlRoot : "/group-association",
        
        initialize: function(){
            
        },
        validate : function(){
            if (!this.get("name") || this.get("name") == ""){
                return false;
            }
            return true;
        }
    });
    return groupAssociation;
});