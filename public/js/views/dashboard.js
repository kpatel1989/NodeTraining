define(function(require){
    var Template = require("text!/templates/dashboard.html"); 
    var AddNoteDialog = require("views/add-note-dialog");
    var PinBoard = require("views/pin-board");
    
    var dashboard = Backbone.View.extend({
        addNoteDialog : null,
        initialize: function(){
            this.render();
            
            this.addNoteDialog = new AddNoteDialog({el:"#addNoteDialog"});
            this.listenTo(this.addNoteDialog,"NOTE_ADDED",this.newNoteAdded);
            
            this.pinBoard = new PinBoard({el:"#pinBoard"});
        },
        render: function(){
            $("body").html(Template);
        },
        events: {
            "click #pinNote" : "pinNoteClickHandler",  
            "click #uploadNote" : "uploadNoteClickHandler"  
        },
        pinNoteClickHandler : function(){
            this.addNoteDialog.show();
        },
        uploadNoteClickHandler : function(){
            
        },
        loadNotes: function(){
            this.pinBoard.loadNotes();
//            $.ajax("/notes",{
//                method : "get",
//                success: (function(data){
//                    this.$("#pinBoard").html();
//                    this.addNotes(data);
//                }).bind(this)
//            })  
        },
//        addNotes : function(notesData){
//            var notes = this.noteTemplate({"notes":notesData});
//            this.$("#pinBoard").append(notes); 
//        },
        newNoteAdded: function(noteData){
            this.pinBoard.addNote(noteData);
        }
    });
    return dashboard;
});