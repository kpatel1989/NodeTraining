require.config({
    baseUrl: 'js',
    paths: {
        "jquery": 'lib/jquery',
        "jquery.ui" : "lib/jquery-ui",
        "bootstrap" : "lib/bootstrap",
        "jquery.slimscroll" : "../plugins/slimScroll/jquery.slimscroll.min",
        "template" : "template/main",
        "socket" : "lib/socket.io",
        "handlebars": 'lib/handlebars',
        "underscore": 'lib/underscore',
        "backbone": 'lib/backbone',
        "views" : "views",
        "models" : "models",
        "collections" : "collections",
        "text" : "lib/helper/text"
    }
});
require(['jquery'],function() {
    require([
        'jquery.ui',
        'bootstrap',
        'jquery.slimscroll',
        'handlebars',
        'underscore',
        'backbone'
    ], function () {
        require(['template','views/login_view'],function(template,LoginView){
            $.widget.bridge('uibutton', $.ui.button);
            var view = new LoginView({el : ".modal-container"});
        })
    });
});