define(function(require){
    var Group = require("models/group");
    var socketio = require("socket");

    var groups = Backbone.Collection.extend({
         urlRoot : "/group/all",
        model : Group,
        initialize : function () {
            var defaultSocket = socketio();
        },
        fetchAll : function () {
            this.fetch({
                url:this.urlRoot,
                data : {
                    userId : window.userData.id
                },
                success: (function (obj, resp) {
                    this.createRooms();
                }).bind(this)
            });
        },
        createRooms : function () {
            _.each(this.models, function (group) {
                var groupData = group.attributes;
                groups.sockets[groupData.name] = socketio(window.location.host+"/"+groupData.name);
            });
        }
    });
    groups.sockets = [];
    return groups;
});