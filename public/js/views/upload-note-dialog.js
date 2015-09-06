define(function(require){
    var UploadDialogTemplate = require("text!/templates/upload-note-dialog.html");
    
    var UploadNoteDialog = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            this.$el.html(UploadDialogTemplate);
        },
        events: {
            "click #close" : "closeDialog",
        },
        closeDialog: function(){
            this.trigger("DIALOG_CLOSE");
            this.hide();  
        },
        show: function() {
            this.$el.fadeIn();
        },
        hide: function(){
            this.$el.fadeOut();
        }
    });
    return UploadNoteDialog;
});