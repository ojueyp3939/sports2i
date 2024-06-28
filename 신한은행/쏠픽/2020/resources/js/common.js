$(document).ready(function(){
	$(window).load(function(){
		var introH = $("#Intro").height();		
		$("#Intro").css('marginTop',-introH/2);	
	});
	
});


/* 탭메뉴  */
function tabMenu(orderTh, tabWarpID, titleClass, bodyClass){
	var tabBodys = $("."+tabWarpID+" ."+bodyClass);
	var tabTitles = $("."+tabWarpID+" ."+titleClass);
	tabBodys.hide();
	tabBodys.eq(orderTh).show();
	tabTitles.each(function(n) {
		$(this).click(function() {
			tabTitles.removeClass("on");
			tabBodys.hide();
			tabBodys.removeClass("on");
			tabTitles.find("img").each(function(n) {
				$(this).attr("src", $(this).attr("src").replace("_on.jpg",".jpg"));
			});

			$(this).addClass("on");
			$(this).find("img").each(function() {
				$(this).attr("src", $(this).attr("src").replace(".jpg","_on.jpg"));
			});
			tabBodys.eq(n).addClass("on");
			tabBodys.eq(n).show();
			//tabBodys.eq(n).fadeIn(); // 서서히 밝아지며 보이게 함
		});
		$(this).click(function() {
			return false;
		});
	});
	tabTitles.eq(orderTh).trigger('click');
}