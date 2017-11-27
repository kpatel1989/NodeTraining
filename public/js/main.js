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
            Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
                lvalue = parseFloat(lvalue);
                rvalue = parseFloat(rvalue);

                return {
                    "+": lvalue + rvalue
                }[operator];
            });
            Handlebars.registerHelper('isAdmin', function(userId, options) {
                if (parseInt(userId) == window.userData.id) {
                    return options.fn(userId, options);
                }
            });
            $.widget.bridge('uibutton', $.ui.button);
            var view = new LoginView({el: "body"});
            if (window.localStorage && window.localStorage.getItem("userData") != 'null'){
                window.userData = JSON.parse(window.localStorage.getItem("userData"));
                view.loadDashboard();
            }
            else {
                view.render();
            }
        })
    });
});