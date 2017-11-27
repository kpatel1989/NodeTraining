define(function(require){
    var dashboard = function(){
        this.template = require("text!/templates/dashboard.html");
        
    };
    dashboard.prototype.setup = function(){
        $("body").html(this.template);
    };
    return dashboard;
});