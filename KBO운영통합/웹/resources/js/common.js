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
	$('input, textarea').placeholder();
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

	//파일 업로드
	var fileTarget = $('.filebox .upload-hidden');

	fileTarget.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}

		$(this).siblings('.upload-name').val(filename);
	});
	
	var imgTarget = $('.preview-image .upload-hidden');
	
	imgTarget.on('change', function(){
		var parent = $(this).parent();
		parent.children('.upload-display').remove();
		
		if(window.FileReader){			
			if (!$(this)[0].files[0].type.match(/image\//)) return;
			var reader = new FileReader();
			reader.onload = function(e){
				var src = e.target.result;
				parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img src="'+src+'" class="upload-thumb"></div></div>');
			}
			reader.readAsDataURL($(this)[0].files[0]);
		} else {
			$(this)[0].select();
			$(this)[0].blur();
			
			var imgSrc = document.selection.createRange().text;
			parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');
			
			var img = $(this).siblings('.upload-display').find('img');
			img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
		}
	});
});