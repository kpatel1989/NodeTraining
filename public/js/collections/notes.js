define(function(require){
   var notes = Backbone.Collection.extend({
       urlRoot : '/note/all'
   });
    return notes;
});