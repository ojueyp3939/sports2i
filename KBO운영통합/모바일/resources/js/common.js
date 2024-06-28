
$(document).ready(function(){
	$(".menu-trigger").append("<span></span><span></span><span></span>");
	$(".btn-date").append("<span></span><span></span>");
	$(".menu-trigger").on('click',function(){
		if (!$(this).hasClass("move")){
			$(this).addClass("move");
		}
		$(".menu-trigger").toggleClass("active");
		$("aside").animate({left:"0"});
	});

	$("aside .btn-close").on('click',function(){
		$(".menu-trigger").removeClass("active");
		$("aside").animate({left:"100%"});
	});
	
	$(".btn-reg").on('click',function(){
		$("body").addClass("pop-on");
		$("body").append('<div class="modal"></div>');
		$("#popup").show();
	});
	$("#popup .btn-cancel,#popup .btn-confirm").on('click',function(){
		$("#popup").hide();
		$("body").removeClass("pop-on");
		$(".modal").remove();

	});

	//선수선택 아코디언
	$( ".player-select" ).accordion({collapsible: true,active: 3});

	//메인 비주얼 롤링
	//$('.visual').bxSlider({auto:true, pause:4000, speed:700, pager:false, controls:true, autoStart:true, autoControls:false });

	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: '년'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	
});

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