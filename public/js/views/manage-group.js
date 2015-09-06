define(function(require){
    var Template = require("text!/templates/manage-group.html");
    var GroupTemplate = require("text!/templates/group-list-item.html");
    var AddGroupDialog = require("views/add-group-dialog");
    var Groups = require("collections/groups");
    
    var manageGroup = Backbone.View.extend({
        initialize:function(options){
            this.render();
            this.groupTemplate = Handlebars.compile(GroupTemplate);
            this.groups = options.groupsCollection
            this.listenTo(this.groups,"add",this.renderGroup);
            
            this.addGroupDialog = new AddGroupDialog({el:"#addGroupDialog"});
            this.listenTo(this.addGroupDialog,"GROUP_ADDED",this.groupAdded);
        },
        events: {
            "click #closeManageGroup" : "hide",  
            "click #createGroup" : "createGroup"  
        },
        render: function(){
            this.$el.html(Template);  
        },
        groupAdded: function(group) {
            this.groups.add(group);
        },
        renderGroup:function(groupModel) {
            var group = this.groupTemplate(groupModel.attributes);
            this.$("#groupsList").append(group);
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