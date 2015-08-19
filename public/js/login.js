$(function() {
    $(document).ready(function(){
    	$("#createAccount").click(function(){    		
    		$("#signInContainer").addClass("hide");
    		$("#register").removeClass("hide");
    	});
        new LoginView({el : "body"});
    });
});