define(function(require){
    var Notes = require("collections/notes");
    var noteTemplateText = require("text!/templates/note.html");
   var pinboard = Backbone.View.extend({
       
       initialize: function(){
           this.noteTemplate = Handlebars.compile(noteTemplateText);
           
           this.notes = new Notes();
           this.listenTo(this.notes,"add",this.renderNote);
       },
       loadNotes: function(){
           this.notes.fetch({
               url:this.notes.urlRoot
           });
       },
       render: function(){
           this.$el.html();
       },
       renderNote: function(note){
           var notes = this.noteTemplate(note.toJSON());
            this.$el.append(notes); 
       },
       addNote: function(noteData){
           this.notes.add(noteData);
       }
   });
    
    return pinboard;
});