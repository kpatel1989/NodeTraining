define(function(require){
    var AddNoteTemplate = require("text!/templates/pin-note-dialog.html");
    var Note = require("models/note");
    
    var AddNoteDialog = Backbone.View.extend({
    
        initialize: function(){
            this.render();
        },
        render: function(){
            this.$el.html(AddNoteTemplate);
        },
        events: {
            "click #close" : "hide",
            "click #save" : "saveNote"
        },
        saveNote : function(){
            var note = new Note();
            note.save({
                "title" : this.$("#title").val(),
                "description" : this.$("#description").val()
            }, {
                success:this.onSuccessfullSave.bind(this)
            });
        },
        onSuccessfullSave: function(object, response){
            if (!response){
                //pin the note.
                this.hide();
                this.trigger("NOTE_ADDED",object.attributes);
            }
        },
        show: function() {
            this.$el.fadeIn();
        },
        hide: function(){
            this.$el.fadeOut();
        }
    });
    return AddNoteDialog;
})