// JavaScript Document
$(document).ready(function(e) {
    
	var didsub = 0;
	var pNum = 0;
	var psts = 0;
	var mwEvt = (/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel");	
	
	text_slide();
	setInterval("text_slide()",8000);
	
	var address = location.href.split("/");
	var leng = address.length;	
	address = address[leng-1].split(".")[0];
	
	if(address == "index" || address == "header") {
		didsub = 0;
	} else {
		didsub = 1;	
	}
	
	if(didsub == 1) {
		$("#nav").css({position:"relative", opacity:"1"});
	}
	
	var bot_sts = 0;
	$("#bott_menu").click(function(e) {
        
		if(bot_sts == 0) {
			$("#banner>div").eq(1).animate({bottom:"0px"});
			$("#bott_menu").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');
			bot_sts = 1;
		} else if(bot_sts == 1) {
			$("#banner>div").eq(1).animate({bottom:"-200px"});
			$("#bott_menu").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>');
			bot_sts = 0;
		}
    });
	
	$("#mainMenu").find("li").eq(2).hover(function(){
		
		$("#menu_bg").stop().animate({height:"50px"},300);
	}, function(){
		
		$("#menu_bg").stop().animate({height:"0px"},300);
	});
});

