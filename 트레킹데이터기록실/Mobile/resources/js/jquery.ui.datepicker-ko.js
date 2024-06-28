/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
		monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
		dayNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
		dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
		dayNamesMin: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: '년',monthSuffix: '월'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});