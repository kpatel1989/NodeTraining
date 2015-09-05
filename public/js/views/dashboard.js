define(function(require){
    var Template = require("text!/templates/dashboard.html"); 
    var UploadDialog = require("views/upload-note-dialog");
    var AddNoteDialog = require("views/add-note-dialog");
    var PinBoard = require("views/pin-board");
    
    var dashboard = Backbone.View.extend({
        addNoteDialog : null,
        uploadDialog : null,
        initialize: function(){
            this.render();
            
            this.addNoteDialog = new AddNoteDialog({el:"#addNoteDialog"});
            this.listenTo(this.addNoteDialog,"NOTE_ADDED",this.newNoteAdded);
            
            this.uploadNoteDialog = new UploadDialog({el:"#uploadNoteDialog"});
    
            this.pinBoard = new PinBoard({el:"#pinBoard"});
        },
        render: function(){
            $("body").html(Template);
        },
        events: {
            "click #pinNote" : "pinNoteClickHandler",  
            "click #uploadNotes" : "uploadNoteClickHandler"
        },
//            "load #uploadTarget" : "onFileUploaded"
        pinNoteClickHandler : function(){
            this.addNoteDialog.show();
        },
        onFileUploaded: function(){
            debugger;
        },
        uploadNoteClickHandler : function(e){
            this.uploadNoteDialog.show();
            /*var files = e.target.files;
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var r = new FileReader();
                var filesData = [];
                r.onload = function(e) { 
                    var contents = e.target.result;
                    filesData.push(contents);
                    $.ajax("/uploadNotes",{
                        method : "POST",
                        data : filesData,
                        success : function(){
                            console.log("success");
                        },
                        error: function(){
                            console.log("error");
                        }
                    });
                }
                r.readAsText(new Blob(files));
            }*/
//            $("#uploadForm").submit();
        },
        loadNotes: function(){
            this.pinBoard.loadNotes();
        },
        newNoteAdded: function(noteData){
            this.pinBoard.addNote(noteData);
        }
    });
    return dashboard;
});