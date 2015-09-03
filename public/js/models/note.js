define(function(require){
   
    var note = Backbone.Model.extend({
       
        urlRoot : "/notes",
        
        initialize: function(){
            
        },
        validate : function(){
            if (!this.get("title") || this.get("title") == ""){
                return false;
            }
            if (!this.get("description") || this.get("description") == ""){
                return false;
            }
            return true;
        }
    });
    return note;
});