define(function(require){
    var Note = require("models/note");

   var notes = Backbone.Collection.extend({
       urlRoot : '/note/all',
       model : Note
   });
    return notes;
});