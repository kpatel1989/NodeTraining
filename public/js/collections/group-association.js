define(function(require){
    var GroupAssociation = require("models/group-association");

    var groupAssociation = Backbone.Collection.extend({
        urlRoot : "/group-associations/all",
        model : GroupAssociation
    });

    return groupAssociation;
});