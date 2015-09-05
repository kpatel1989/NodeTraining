require.config({
    baseUrl: 'js',
    paths: {
        "jquery": 'lib/jquery',
        "jquery-form" : 'lib/jquery.form.min',
        "jquery-file-upload" : 'lib/jquery.fileupload',
        "jquery-iframe-transport" : "lib/jquery.iframe-transport",
        "jquery-knob" : "lib/jquery.knob",
        "jquery-ui-widget" : "lib/jquery.ui.widget",
        "uploader" : "lib/uploader",
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
         'jquery-form',
         'jquery-file-upload',
         'jquery-iframe-transport',
         'jquery-knob',
         'jquery-ui-widget',
         'uploader',
         'handlebars',
         'underscore',
         'backbone',
         'login'
        ],function($,
                    jQueryForm,
                    jQueryFileUpload,
                    jQueryIFrame,
                    jQueryKnob,
                    jQueryUiWidget,
                    uploader,
                    Handlebars,
                    _,
                    Backbone,
                    Login){
    Login();
});