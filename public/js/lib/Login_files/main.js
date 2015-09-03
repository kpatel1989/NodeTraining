require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        bootstrap : 'lib/bootstrap',
        backbone: 'lib/backbone',
        views : "views",
        models : "models",
        collections : "collections",
        text : "lib/helper/text"
    }
});

require(['jquery','underscore','backbone','login'],function($,_,Backbone,Login){
    Login();
});