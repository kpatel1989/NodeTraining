define(function(require){
    var groupAssociation = Backbone.Collection.extend({
         urlRoot : "/group-association"
    });
    return groupAssociation;
});