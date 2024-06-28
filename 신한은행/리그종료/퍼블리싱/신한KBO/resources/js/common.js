$(document).ready(function(){
	
	//사이드메뉴
	var $aside = $("aside");
	var $modal = $("<div class='modal'></div>");
	
	$(".btn-aside").click(function(){
		$("body").addClass("side-on");
		if ($aside.hasClass("on")) {						
			$("body").removeClass();
			$("aside").removeClass("on");
			$("aside").stop().animate({right:"-90%"}, function(){
				$($modal).remove();
				$("aside .navdep1").removeClass("current");
				$(".navdep1 h2").next(".navdep2 ").stop().hide();
			});					
			$(this).removeClass("open");					
		} else {
			$("body").append($modal);
			$("aside").addClass("on");
			$("aside").animate({right:"0"});
			$(this).addClass("open");
		}
	});

	$(".navdep1 h2 > a ").click(function(){
		if (!$(this).parents(".navdep1").hasClass("current")){					
			$(".navdep1").removeClass("current");
			$(".nav-league .navdep2 .event span").hide();
			$(this).parents(".navdep1").addClass("current");
			$(".navdep1 h2").next(".navdep2").stop().slideUp();
			$(this).parent().next(".navdep2").addClass("on").stop().slideDown(function(){
				if ($(this).parents().hasClass("nav-league")){
					$(".nav-league .navdep2 .event span").fadeIn();
				}
			});
		}		
	});
});

// 경기일정 탑플레이어 탭
function tpTab(val){
	for (i=0; i<2; i++) {
	var tp_tb = document.getElementById('tp_tab_' + i);
	if (i != val) tp_tb.style.display = "none";
	else tp_tb.style.display = "block";
	}
}

/* 탭메뉴  */
function tabMenu(orderTh, tabWarpID, titleClass, bodyClass){
	var tabBodys = $("#"+tabWarpID+" ."+bodyClass);
	var tabTitles = $("#"+tabWarpID+" ."+titleClass);
	tabBodys.hide();
	tabBodys.eq(orderTh).show();
	tabTitles.each(function(n) {
		$(this).click(function() {
			tabTitles.removeClass("on");
			tabBodys.hide();
			tabTitles.find("img").each(function(n) {
				$(this).attr("src", $(this).attr("src").replace("_on.jpg",".jpg"));
			});

			$(this).addClass("on");
			$(this).find("img").each(function() {
				$(this).attr("src", $(this).attr("src").replace(".jpg","_on.jpg"));
			});
			tabBodys.eq(n).show();
			//tabBodys.eq(n).fadeIn(); // 서서히 밝아지며 보이게 함
		});
		$(this).click(function() {
			return false;
		});
	});
	tabTitles.eq(orderTh).trigger('click');
}