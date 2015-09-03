define(function(require){
   var notes = Backbone.Collection.extend({
       urlRoot : '/notes'
   });
    return notes;
});