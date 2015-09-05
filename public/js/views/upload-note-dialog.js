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
            "click #close" : "hide",
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