define(function(require){
    var Notes = require("collections/notes");
    var noteTemplateText = require("text!/templates/note.html");
    var pinboard = Backbone.View.extend({
       initialize: function(){
           this.noteTemplate = Handlebars.compile(noteTemplateText);
           this.notes = new Notes();
           this.listenTo(this.notes,"add",this.renderNote);
           this.listenTo(this.notes,"remove",this.deleteNote);
           this.listenTo(this.notes,"change",this.updateNote);
           this.groupId = 'null';
       },
        events: {
            "click .note a" : "onNoteClicked",
            "click .note .delete-icon" : "onDeleteClicked"
        },
        onNoteClicked: function(event){
            var id = $(event.target).data("id");
            var note = this.notes.get(id);
            if (note)
                this.trigger("SHOW_NOTE",note.toJSON());
        },
        onDeleteClicked: function(event){
            var id = $(event.target).data("id");
            var note = this.notes.get(id);
            if (note){
                note.deleteNote();
            }
        },
       loadNotes: function(){
           this.notes.fetch({
               url:this.notes.urlRoot,
               data:{
                   userId:window.userData.id,
                   groupId:this.groupId
               }
           });
       },
        loadGroup : function(groupId){
            this.groupId = groupId+'';
            this.loadNotes();
        },
       render: function(){
           this.$el.html();
       },
       renderNote: function(note){
           var notes = this.noteTemplate(note.toJSON());
            this.$el.append(notes); 
       },
        deleteNote : function(note){
            var noteDiv = this.$el.find("li[data-id='"+note.get("id")+"']");
            noteDiv.remove();
        },
       addNote: function(noteData){
           if (noteData.groupId.toString() === this.groupId.toString())
           this.notes.set(noteData,{remove:false});
       },
        updateNote: function(noteData){
            var noteDiv = this.$el.find("li[data-id='"+noteData.get("id")+"']");
            var newNoteDiv = this.noteTemplate(noteData.toJSON());
            $(noteDiv).replaceWith(newNoteDiv);
        }
    });
    return pinboard;
});