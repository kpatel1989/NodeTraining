require.config({
    baseUrl: 'js',
    paths: {
        "jquery": 'lib/jquery',
        "jquery.ui.widget" : "lib/jquery.ui.widget",
        "jquery.knob" : "lib/jquery.knob",
        "jquery.iframe-transport" : "lib/jquery.iframe-transport",
        "jquery.fileupload" : "lib/jquery.fileupload",
        "handlebars": 'lib/handlebars',
        "underscore": 'lib/underscore',
        "bootstrap" : 'lib/bootstrap',
        "backbone": 'lib/backbone',
        "views" : "views",
        "models" : "models",
        "collections" : "collections",
        "text" : "lib/helper/text"
    }
});

require(['jquery',
         'handlebars',
         'underscore',
         'backbone',
         'login',
         'jquery.ui.widget',
         'jquery.knob',
         'jquery.iframe-transport',
         'jquery.fileupload'
        ],function($,
                    Handlebars,
                    _,
                    Backbone,
                    Login){
    Login();
});