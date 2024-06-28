// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint 0.3
//
// - 19/06/2009 - some new implementations, added Opera support
// - 11/05/2009 - first sketch
//
// Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
// requires jQuery 1.3.x
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//------------------------------------------------------------------------

(function ($) {
    var opt;

    $.fn.jqprint = function (options) {
        opt = $.extend({}, $.fn.jqprint.defaults, options);

        var $element = (this instanceof jQuery) ? this : $(this);

        if (opt.operaSupport && $.browser.opera) {
            var tab = window.open("", "jqPrint-preview");
            tab.document.open();

            var doc = tab.document;
        }
        else {
            var $iframe = $("<iframe  />");

            if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }

            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
        }

        if (opt.importCSS) {
            if ($("link[media=print]").length > 0) {
                $("link[media=print]").each(function () {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
                });
            }
            else {
                $("link").each(function () {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
                });
            }
        }


        if (opt.printContainer) { doc.write($element.outer()); }
        else { $element.each(function () { doc.write($(this).html()); }); }

        doc.close();

        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();

        //factory.printing.Print(false, ($iframe[0].contentWindow));

        if (getBrowserInfoStr() == "Chrome")    // 크롬제외
        {
        }
        //else {
        //    factory.printing.header = "";   // Header에 들어갈 문장
        //    factory.printing.footer = "";   // Footer에 들어갈 문장
        //    factory.printing.portrait = true   // false 면 가로인쇄, true 면 세로 인쇄
        //    factory.printing.leftMargin = 17   // 왼쪽 여백 사이즈
        //    factory.printing.topMargin = 0   // 위 여백 사이즈
        //    factory.printing.rightMargin = 15  // 오른쪽 여백 사이즈
        //    factory.printing.bottomMargin = 0  // 아래 여백 사이즈
        //    //factory.printing.SetMarginMeasure(2); // 테두리 여백 사이즈 단위를 인치로 설정합니다.
        //    //factory.printing.paperSize = "A4";   // 용지 사이즈
        //    //factory.printing.collate = true;   //  순서대로 출력하기
        //}

        setTimeout(function () { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 1000);
    }


    $.fn.jqprint.defaults = {
        debug: false,
        importCSS: true,
        printContainer: true,
        operaSupport: true
    };

    // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
    jQuery.fn.outer = function () {
        return $($('<div></div>').html(this.clone())).html();
    }
})(jQuery);