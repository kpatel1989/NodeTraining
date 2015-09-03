require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery',
        "jquery-form" : 'lib/jquery.form.min',
        handlebars: 'lib/handlebars',
        underscore: 'lib/underscore',
        bootstrap : 'lib/bootstrap',
        backbone: 'lib/backbone',
        views : "views",
        models : "models",
        collections : "collections",
        text : "lib/helper/text"
    }
});

require(['jquery','jquery-form','handlebars','underscore','backbone','login'],function($,jQueryForm,Handlebars,_,Backbone,Login){
    Login();
});