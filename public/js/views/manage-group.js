define(function(require){
    var Template = require("text!/templates/manage-group.html");
    var GroupTemplate = require("text!/templates/group-list-item.html");
    var GroupRequestTemplate = require("text!/templates/group-request-list-item.html");
    var AddGroupDialog = require("views/add-group-dialog");
    var JoinGroupDialog = require("views/join-group-dialog");
    var Groups = require("collections/groups");
    var GroupAssociations = require("collections/group-association");
    
    var manageGroup = Backbone.View.extend({
        initialize:function(options){
            this.render();
            this.groupTemplate = Handlebars.compile(GroupTemplate);
            this.groupRequestTemplate = Handlebars.compile(GroupRequestTemplate);
            this.groups = options.groupsCollection
            this.listenTo(this.groups,"add",this.renderGroup);
            
            this.addGroupDialog = new AddGroupDialog({el:".modal-container"});
            this.listenTo(this.addGroupDialog,"GROUP_ADDED",this.groupAdded);
            
            //this.joinGroupDialog = new JoinGroupDialog({el:".modal-container"});
            
            this.groupAssociations = new GroupAssociations();
            this.listenTo(this.groupAssociations,"add",this.renderGroupRequest);
            
        },
        events: {
            "click #closeManageGroup" : "hide",  
            "click #createGroup" : "createGroup",  
            "click #joinGroup" : "joinGroup",  
            "click .approve" : "approveRequest"  
        },
        render: function(){
            //this.$el.html(Template);
        },
        showAddGroupDialog: function(){
            this.addGroupDialog.show();
        },
        groupAdded: function(group) {
            this.groups.add(group);
        },
        joinGroup: function(){
            this.joinGroupDialog.show();
        },
        approveRequest: function(e){
            var id = $(e.target).data("id");
            var model = this.groupAssociations.get(id);
            this.listenTo(model,"MODEL_SAVED",this.onSuccessfulSave);

            model.approveRequest();
        },
        onSuccessfulSave: function(response){
            var requestDiv = this.$el.find("div.row.group-request[data-id='"+response.id+"']");
//                    model.destroy();
            requestDiv.remove();
        },
        fetchGroupRequest: function(){
            this.groupAssociations.fetch({
                url:this.groupAssociations.urlRoot,
                data : {
                    userId : window.userData.id
                }
            });
        },
        renderGroup:function(groupModel) {
            var group = this.groupTemplate(groupModel.attributes);
            this.$("#groupsList").append(group);
        },
        renderGroupRequest:function(groupRequestModel) {
            var groupRequest = this.groupRequestTemplate(groupRequestModel.attributes);
            this.$("#groupRequestList").append(groupRequest);
        },
        createGroup: function(){
            this.addGroupDialog.show();
        },
        show: function(){
            this.$el.fadeIn();
        },
        hide:function(){
            this.$el.fadeOut();
        }
    });
    return manageGroup;
});