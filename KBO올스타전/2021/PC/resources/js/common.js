/* GNB & LNB 활성화  */
currentGnb = function (gnbCode) {
    $(".gnb li a#gnb" + gnbCode).addClass("gon").parents("li").siblings().children("a").removeClass("gon");
}
currentLnb = function (lnbCode) {
    $(".lnb ul li a#lnb" + lnbCode).addClass("lon").parents("li").siblings().children("a").removeClass("lon");
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

$(document).ready(function(){			
	
});