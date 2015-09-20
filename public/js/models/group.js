define(function(require){
   
    var group = Backbone.Model.extend({
       
        urlRoot : "/group",
        
        initialize: function(){
            
        },
        validate : function(){
            if (!this.get("name") || this.get("name") == ""){
                return false;
            }
            return true;
        },
        saveGroup: function () {

            this.save(null,{
                url : this.urlRoot + "/save",
                validate : false,
                success:this.onSuccessfulSave.bind(this)
            });
        },
        onSuccessfulSave: function(object, response){
            this.trigger("MODEL_SAVED",this.attributes);
        },
        deleteGroup : function () {
            this.destroy({
                url : this.urlRoot+"/delete/"+this.attributes.id,
                success: (function(){
                    this.trigger("MODEL_DELETED",this.attributes);
                }).bind(this)
            });
        }
    });
    return group;
});