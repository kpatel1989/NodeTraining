require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery',
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

require(['jquery','handlebars','underscore','backbone','login'],function($,Handlebars,_,Backbone,Login){
    Login();
});