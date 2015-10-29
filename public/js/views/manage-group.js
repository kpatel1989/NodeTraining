define(function(require){
    var Template = require("text!/templates/manage-group.html");
    var GroupRequestTemplate = require("text!/templates/group-request-list-item.html");
    var JoinGroupDialog = require("views/join-group-dialog");
    var GroupAssociations = require("collections/group-association");
    
    var manageGroup = Backbone.View.extend({
        initialize:function(options){
            this.template = Handlebars.compile(Template);
            this.groupRequestTemplate = Handlebars.compile(GroupRequestTemplate);

            this.groupAssociations = new GroupAssociations();
            this.listenTo(this.groupAssociations,"add",this.renderGroupRequest);

            this.groups = options.groups;
        },
        events: {
            "click #closeManageGroup" : "hide",
            "click #joinGroup" : "joinGroup",  
            "click .approve" : "approveRequest",
            "click #updateGroup" : "saveGroup",
            "click #deleteGroup" : "deleteGroup",
            "click #addUser" : "onAddUserClick"
        },
        render: function(){
            var data = this.group.toJSON();
            if (!data.isAdmin) {
                data.isAdmin = this.group.get("adminId").toString() == window.userData.id.toString();
            }
            this.$el.html(this.template(data));
        },
        loadGroupData : function (groupData) {
            this.group = groupData;
        },
        joinGroup: function(){
            this.joinGroupDialog.show();
        },
        saveGroup: function(){
            this.group.set({name:this.$("#groupName").val()});
            this.group.saveGroup();
        },
        deleteGroup: function(){
            this.group.deleteGroup();
            this.hide();
        },
        onAddUserClick: function(){
            //TODO: add User
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
        renderGroupRequest:function(groupRequestModel) {
            var groupRequest = this.groupRequestTemplate(groupRequestModel.attributes);
            this.$("#groupRequestList").append(groupRequest);
        },
        show: function() {
            this.render();
            $('#manage-group-modal').modal('show');
            this.delegateEvents();
        },
        hide: function(){
            $('#manage-group-modal').modal('hide');
            this.undelegateEvents();
        }
    });
    return manageGroup;
});