define(function(require){
    var Group = require("models/group");

    var groups = Backbone.Collection.extend({
         urlRoot : "/group/all",
        model : Group
    });
    return groups;
});