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
	//gnb
	/*$('.menu > li').on('mouseenter',function(){		
		$('.menu > li').removeClass('on');
		$(this).addClass('on');
		//$(this).find('.lnb-sub').stop().fadeIn(50);		
	})
	
	$('menu > li').on('mouseleave',function(){		
		//$(this).find('.lnb-sub').stop().fadeOut(100);
		$(this).removeClass('on');
	});*/

	$('.search-box > .ipt-search').focusin(function(){
		$(this).val('');
	});
	$('.search-box > .ipt-search').focusout(function(){
		$(this).val('선수 검색하기');
	});


	//메인 비주얼 롤링
	$('.visual').bxSlider({auto:true, pause:4000, speed:700, pager:false, controls:true, autoStart:true, autoControls:false });

	//뉴스 롤링
	$('.news-visual').bxSlider({mode:'fade',auto:false, pause:4000, speed:700, pager:true, controls:false, autoStart:false, autoControls:false, pagerCustom:'.news-pager' });

	$('.game-list').bxSlider({auto:false, pause:4000, speed:700, pager:false, controls:true, autoStart:true, autoControls:false,slideWidth:210, minSlides:5, maxSlides:5,slideMargin:10});
	
});