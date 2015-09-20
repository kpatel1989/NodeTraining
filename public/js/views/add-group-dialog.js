define(function(require){
    var AddGroupTemplate = require("text!/templates/add-group-dialog.html");
    var Group = require("models/group");
    
    var AddGroupDialog = Backbone.View.extend({
        model : null,
        initialize: function(){
            this.model = new Group();
            this.listenToModel();
            this.undelegateEvents();
            this.render();
        },
        listenToModel: function () {
            this.listenTo(this.model,"change",this.onModelChange);
            this.listenTo(this.model,"MODEL_SAVED",this.onSuccessfulSave);
        },
        render: function(){
            this.$el.html(AddGroupTemplate);

        },
        events: {
            "click #close" : "hide",
            "click #saveGroup" : "saveGroup"
        },
        saveGroup : function(){
            this.model.set({
                "name" : this.$("#name").val(),
                "adminId" : window.userData.id
            });
            this.model.saveGroup();
        },
        onSuccessfulSave: function(response){
            if (response.id){
                this.hide();
                this.trigger("GROUP_ADDED",this.model);
            }
        },
        set: function(note){
            this.model.set(note);
        },
        onModelChange : function(){
            this.$("#name").val(this.model.get("name"));
        },
        show: function() {
            this.render();
            $('#add-group-modal').modal('show');
            this.delegateEvents();
        },
        hide: function(){
            $('#add-group-modal').modal('hide');
            this.$("#name").val('');
            this.undelegateEvents();
        }
    });
    return AddGroupDialog;
})