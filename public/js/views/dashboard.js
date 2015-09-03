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
            "change .btn-file :file" : "uploadNoteClickHandler"  
        },
        pinNoteClickHandler : function(){
            this.addNoteDialog.show();
        },
        uploadNoteClickHandler : function(e){
            var formdata = new FormData();
            var files = e.target.files;
            var file;
            var len = files.length;
            var i =0;
            for ( ; i < len; i++ ) {
                file = files[i];
                if ( window.FileReader ) {
                    reader = new FileReader();
                    reader.readAsDataURL(file);
                }
                if (formdata) {
                    formdata.append("file", file);
                }       
            }
            if (formdata) 
            {
                $.ajax({
                    url: "/uploadNotes",
                    type: "POST",
                    data: formdata,
                    cache: false,
                    processData: false,
                    contentType: false,
                    enctype:"multipart/form-data",
                    uploadMultiple: true,
                    success : function(res){
                        console.log(res);
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            }
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