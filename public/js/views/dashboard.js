define(function(require){
    var Template = require("text!/templates/dashboard.html"); 
    var UploadDialog = require("views/upload-note-dialog");
    var AddNoteDialog = require("views/add-note-dialog");
    var PinBoard = require("views/pin-board");
    var ManageGroup = require("views/manage-group");
    var GroupTemplate = require("text!/templates/group-list-item.html");
    var Groups = require("collections/groups");
    
    var dashboard = Backbone.View.extend({
        addNoteDialog : null,
        uploadDialog : null,
        socket : null,
        initialize: function(){
            this.render();
            
            this.groupTemplate = Handlebars.compile(GroupTemplate);
            
            this.addNoteDialog = new AddNoteDialog({el:"#addNoteDialog"});
            this.listenTo(this.addNoteDialog,"NOTE_ADDED",this.newNoteAdded);
            
            this.uploadNoteDialog = new UploadDialog({el:"#uploadNoteDialog"});
            this.listenTo(this.uploadNoteDialog,"DIALOG_CLOSE",this.uploadDialogClosed);
    
            this.pinBoard = new PinBoard({el:"#pinBoard"});
            this.listenTo(this.pinBoard,"SHOW_NOTE",this.showNote);
            
            this.groups = new Groups();
            this.listenTo(this.groups,"add",this.addGroup);
            
            this.manageGroup = new ManageGroup({el : "#manageGroupPage",groupsCollection:this.groups});
            this.listenTo(this.manageGroup,"GROUP_ADDED",this.updateGroupList);
        },
        render: function(){
            $("body").html(Template);
        },
        events: {
            "click #pinNote" : "pinNoteClickHandler",  
            "click #uploadNotes" : "uploadNoteClickHandler",
            "click #manageProfile" : "manageProfileClickHandler",
            "click #manageGroup" : "manageGroupClickHandler",
            "click .pin-board-group" : "pinboardGroupNameClick"
        },
        showNote: function(note){
            this.addNoteDialog.set(note);
            this.addNoteDialog.show();  
        },
        pinNoteClickHandler : function(){
            this.addNoteDialog.show();
        },
        manageProfileClickHandler : function(){
            
        },
        manageGroupClickHandler : function(){
            this.manageGroup.show();
        },
        pinboardGroupNameClick: function(e){
            var groupId = $(e.target).data("id");
            this.pinBoard.loadGroup(groupId);
            this.addNoteDialog.setGroupId(groupId);
        },
        uploadNoteClickHandler : function(e){
            this.uploadNoteDialog.show();
        },
        uploadDialogClosed: function(){
            this.pinBoard.loadNotes();  
        },
        loadNotes: function(){
            this.pinBoard.loadNotes();
            this.updateGroupList();
            this.manageGroup.fetchGroupRequest();
        },
        newNoteAdded: function(noteData){
            this.pinBoard.addNote(noteData);
        },
        updateGroupList: function(){
            this.groups.fetch({
                url:this.groups.urlRoot,
                data : {
                    userId : window.userData.id
                }
            });
        },
        addGroup: function(groupData){
            var group = this.groupTemplate(groupData.toJSON());
            this.$("#groupList").append(group);
        }
    });
    return dashboard;
});