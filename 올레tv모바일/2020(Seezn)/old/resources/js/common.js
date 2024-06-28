$(document).ready(function(){		
	/*viewport();


	function viewport(){
		var viewportW = $(window).width();		
		var viewportH = $(window).height();		
	
		$("body").css({width:viewportW,height:viewportH});
	};	



	$(window).resize(function(){
		viewport();
	});		*/

	var viewW = $(window).width();
	var viewH = $(window).height();
	
	$(window).resize(function(){
		fullMode ();
	});

	function fullMode (){
		if ($("body > div").hasClass("full-mode")){
			if (viewW >= 1024) {		
				MainContH = $("#MainCont").height();
				//alert(viewH);
				//alert(MainContH);
				$(".full-mode").css({paddingTop:(viewH-MainContH)/2})
			}
		}
	}		

	fullMode();
	
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
				$(this).attr("src", $(this).attr("src").replace("_on.gif",".gif"));
			});

			$(this).addClass("on");
			$(this).find("img").each(function() {
				$(this).attr("src", $(this).attr("src").replace(".gif","_on.gif"));
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

