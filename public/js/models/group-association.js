define(function(require){
   
    var groupAssociation = Backbone.Model.extend({
       
        urlRoot : "/group-associations",
        
        initialize: function(){
            
        },
        validate : function(){
            if (!this.get("name") || this.get("name") == ""){
                return false;
            }
            return true;
        },
        saveJoinRequest:function(){
            this.save(null,{
                url : this.urlRoot + "/save",
                validate : false,
                success:this.onSuccessfulSave.bind(this)
            });
        },
        approveRequest:function(){
            this.set("approved",true);
            this.save(null,{
                url : this.urlRoot + "/approve",
                validate : false,
                success:this.onSuccessfulSave.bind(this)
            });
        },
        onSuccessfulSave: function(object, response){
            this.trigger("MODEL_SAVED",this.attributes);
        }
    });
    return groupAssociation;
});