define(function(require){
    var Template = require("text!/templates/dashboard.html");
    var AddNoteDialog = require("views/add-note-dialog");
    var PinBoard = require("views/pin-board");
    var ManageGroup = require("views/manage-group");
    var GroupTemplate = require("text!/templates/group-list-item.html");
    var Groups = require("collections/groups");
    var AddGroupDialog = require("views/add-group-dialog");

    var dashboard = Backbone.View.extend({
        addNoteDialog : null,
        uploadDialog : null,
        initialize: function(){
            this.render();

            this.groupTemplate = Handlebars.compile(GroupTemplate);

            this.addNoteDialog = new AddNoteDialog({el:".modal-container"});
            this.listenTo(this.addNoteDialog,"NOTE_ADDED",this.newNoteAdded);

            this.addGroupDialog = new AddGroupDialog({el:".modal-container"});
            this.listenTo(this.addGroupDialog,"GROUP_ADDED",this.newGroupAdded);

            this.pinBoard = new PinBoard({el:"#pinBoard"});
            this.listenTo(this.pinBoard,"SHOW_NOTE",this.showNote);

            this.groups = new Groups();
            this.listenTo(this.groups,"add",this.addGroup);
            this.listenTo(this.groups,"change",this.addGroup);
            this.listenTo(this.groups,"MODEL_SAVED",this.updateGroupList);
            this.listenTo(this.groups,"remove",this.groupDeleted);
            this.listenTo(this.groups,"NEW_GROUP_NOTE",this.newNoteAdded);
            this.listenTo(this.groups,"GROUP_NOTE_DELETED",this.noteDeleted);

            this.manageGroup = new ManageGroup({el : ".modal-container",groups:this.groups});
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
            "click .pin-board-group" : "pinboardGroupNameClick",
            "click .edit-btn" : "onEditgroupBtnClick"
        },
        showNote: function(note){
            this.addNoteDialog.show();
            this.addNoteDialog.set(note);
        },
        onEditgroupBtnClick: function (e) {
            var id = $(e.currentTarget).data("id");
            this.manageGroup.loadGroupData(this.groups.get(id));
            this.manageGroup.show();
            e.stopPropagation();
        },
        pinNoteClickHandler : function(){
            this.addNoteDialog.set(null);
            this.addNoteDialog.show();
        },
        addGroupBtnClick: function(){
            this.addGroupDialog.show();
//            this.manageGroup.showAddGroupDialog();
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
        },
        newNoteAdded: function(noteData){
            this.pinBoard.addNote(noteData);
        },
        noteDeleted: function (noteData) {
            this.pinBoard.deleteGroupNote(noteData);
        },
        updateGroupList: function(){
            this.groups.reset();
            this.$("#groupList").html("");
            this.groups.fetchAll();
        },
        groupDeleted: function () {
            this.updateGroupList();
            this.pinBoard.loadGroup(null);
            this.addNoteDialog.setGroupId(null);
        },
        addGroup: function(groupData){
            var group = this.groupTemplate(groupData.toJSON());
            this.$("#groupList").append(group);
        },
        newGroupAdded: function (model) {
            this.groups.add(model);
        }
        
    });
    return dashboard;
});