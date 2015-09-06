define(function(require){
    var groups = Backbone.Collection.extend({
         urlRoot : "/groups"
    });
    return groups;
});