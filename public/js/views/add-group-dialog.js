define(function(require){
    var AddGroupTemplate = require("text!/templates/add-group-dialog.html");
    var Group = require("models/group");
    
    var AddGroupDialog = Backbone.View.extend({
        model : null,
        initialize: function(){
            this.model = new Group();
            this.listenTo(this.model,"change",this.onModelChange);
            this.render();
        },
        render: function(){
            this.$el.html(AddGroupTemplate);
        },
        events: {
            "click #close" : "hide",
            "click #save" : "saveNote"
        },
        saveNote : function(){
            this.model.set({
                "name" : this.$("#name").val(),
                "adminId" : window.userData.id
            });
            this.model.save(null,{
                validate : false,
                success:this.onSuccessfullSave.bind(this)
            });
        },
        onSuccessfullSave: function(object, response){
            if (response.id){
                this.hide();
                this.trigger("GROUP_ADDED",object.attributes);
            }
        },
        set: function(note){
            this.model.set(note);
        },
        onModelChange : function(){
            this.$("#name").val(this.model.get("name"));
        },
        show: function() {
            this.$el.fadeIn();
        },
        hide: function(){
            this.$el.fadeOut();
        }
    });
    return AddGroupDialog;
})