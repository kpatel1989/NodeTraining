define(function(require){
    var Template = require("text!/templates/dashboard.html");
    var AddNoteDialog = require("views/add-note-dialog");
    var PinBoard = require("views/pin-board");
    var ManageGroup = require("views/manage-group");
    var GroupTemplate = require("text!/templates/group-list-item.html");
    var Groups = require("collections/groups");

    var dashboard = Backbone.View.extend({
        addNoteDialog : null,
        uploadDialog : null,
        initialize: function(){
            this.render();

            this.groupTemplate = Handlebars.compile(GroupTemplate);

            this.addNoteDialog = new AddNoteDialog({el:".modal-container"});
            this.listenTo(this.addNoteDialog,"NOTE_ADDED",this.newNoteAdded);

            this.pinBoard = new PinBoard({el:"#pinBoard"});
            this.listenTo(this.pinBoard,"SHOW_NOTE",this.showNote);

            this.groups = new Groups();
            this.listenTo(this.groups,"add",this.addGroup);
            this.listenTo(this.groups,"NEW_GROUP_NOTE",this.newNoteAdded);

            this.manageGroup = new ManageGroup({el : "body",groupsCollection:this.groups});
            this.listenTo(this.manageGroup,"GROUP_ADDED",this.updateGroupList);
        },
        render: function(){
            this.$el.html(Template);
            this.templateFixes();
        },
        templateFixes: function() {
            $(window).resize();
            $.AdminLTE.pushMenu.activate("[data-toggle='offcanvas']");
        },
        events: {
            "click #pinNote" : "pinNoteClickHandler",
            "click #addGroupBtn" : "addGroupBtnClick",
            "click #manageProfile" : "manageProfileClickHandler",
            "click #manageGroup" : "manageGroupClickHandler",
            "click .pin-board-group" : "pinboardGroupNameClick"
        },
        showNote: function(note){
            this.addNoteDialog.show();
            this.addNoteDialog.set(note);
        },
        pinNoteClickHandler : function(){
            this.addNoteDialog.set(null);
            this.addNoteDialog.show();
        },
        addGroupBtnClick: function(){
            this.manageGroup.showAddGroupDialog();
        },
        manageProfileClickHandler : function(){
            
        },
        manageGroupClickHandler : function(){
            this.manageGroup.show();
        },
        pinboardGroupNameClick: function(e){
            $(".pin-board-group").removeClass("active");
            $(e.currentTarget).addClass("active");
            var groupId = $(e.target).data("id");
            this.pinBoard.loadGroup(groupId);
            this.addNoteDialog.setGroupId(groupId);
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
            this.groups.fetchAll();
        },
        addGroup: function(groupData){
            var group = this.groupTemplate(groupData.toJSON());
            this.$("#groupList").append(group);
        }
    });
    return dashboard;
});