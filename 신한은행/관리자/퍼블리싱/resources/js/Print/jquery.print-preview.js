/*!
* jQuery Print Previw Plugin v1.0.1
*
* Copyright 2011, Tim Connell
* Licensed under the GPL Version 2 license
* http://www.gnu.org/licenses/gpl-2.0.html
*
* Date: Wed Jan 25 00:00:00 2012 -000
*/

(function ($) {

    var areaName;
    // Initialization
    $.fn.printPreview = function (areaNm) {
        areaName = areaNm;

        if (!$('#print-modal').length) {
            $(".nPrint").hide();
            $.printPreview.loadPrintPreview($(this));
            $(".nPrint").show();
        }

    };

    // Private functions
    var mask, size, print_modal, print_controls;
    $.printPreview = {
        loadPrintPreview: function (container) {

            // Declare DOM objects
            print_modal = $('<div id="print-modal"></div>');
            print_controls = $('<div id="print-modal-controls">' +
                                    //'<a href="#" class="download" title="Capture page">Capture page</a>' +
                                    '<a href="#" class="print" title="Print page">Print page</a>' +
                                    '<a href="#" class="close" title="Close print preview">Close</a>').hide();
            var print_frame = $('<iframe id="print-modal-content" scrolling="no" border="0" frameborder="0" name="print-frame" />');

            // Raise print preview window from the dead, zooooooombies
            print_modal
                .hide()
                .append(print_controls)
                .append(print_frame)
                .appendTo('body');

            // The frame lives
            for (var i = 0; i < window.frames.length; i++) {
                if (window.frames[i].name == "print-frame") {
                    var print_frame_ref = window.frames[i].document;
                    break;
                }
            }

            print_frame_ref.open();
            print_frame_ref.write('<!DOCTYPE html>' +
                '<html lang="ko">' +
                '<head><title>' + document.title + '</title></head>' +
                '<body style="background:#ffffff"></body>' +
                '</html>');
            print_frame_ref.close();

            // Grab contents and apply stylesheet
            var $iframe_head = $('head link[media*=print], head link[media=all]').clone(),
                $iframe_body = container.children(':not(#print-modal):not(script)').clone();


            $iframe_head.each(function () {
                $(this).attr('media', 'all');
            });           

            if (!$.browser.msie && !($.browser.version < 7)) {
                $('head', print_frame_ref).append($iframe_head);
                $('body', print_frame_ref).append($iframe_body);
            }
            else {
                $iframe_head.each(function () {
                    $('head', print_frame_ref).append($(this).attr('media', 'all')[0].outerHTML);
                });
                $iframe_body.each(function () {
                    $('body', print_frame_ref).append($(this)[0].outerHTML);
                });
            }

            // Disable all links
            $('a', print_frame_ref).bind('click.printPreview', function (e) {
                e.preventDefault();
            });

            // Introduce print styles
            $('head').append('<style type="text/css">' +
                '@media print {' +
                    '/* -- Print Preview --*/' +
                    '#print-modal-mask,' +
                    '#print-modal {' +
                        'display: none !important;' +
                    '}' +
                '}' +
                '</style>'
            );

            // Load mask
            $.printPreview.loadMask();

            // Disable scrolling
            $('body').css({ overflowY: 'hidden', height: '100%' });
            $('img', print_frame_ref).load(function () {
                print_frame.height($('body', print_frame.contents())[0].scrollHeight);
            });
            // Position modal            
            starting_position = $(window).height() + $(window).scrollTop();
            //starting_position = $(window).scrollTop();
            //alert(starting_position)
            var css = {
                //top: 0,
                top: $(window).scrollTop(),
                height: '100%',
                overflowY: 'auto',
                zIndex: 10000,
                display: 'block'
            }

            print_modal
                .css(css)
                .animate({ top: $(window).scrollTop() }, 400, 'linear', function () { // 스크롤 위치에 따른 오류 수정
                    //.animate({ top: 0 }, 400, 'linear', function () {
                    print_controls.fadeIn('slow').focus();
                });
									
			/*
            if (getBrowserInfoStr() == "Chrome") {               				
				 alert(print_frame.height());
            }	*/	
			print_frame.height($('body', print_frame.contents())[0].scrollHeight);

            // Bind closure
            $('a', print_controls).bind('click', function (e) {
                e.preventDefault();
                if ($(this).hasClass('print')) {

                    var chartObj = print_frame.contents().find('.highcharts-container');

                    for (var i = 0; i < chartObj.length; i++) {
                        var canvas = document.createElement("canvas");
                        var svg = chartObj.eq(i).html();
                        canvg(canvas, svg);
                        var img = $("<img />").attr({ "src": canvas.toDataURL("image/png") });
                        chartObj.eq(i).parent('div').append(img);
                        svg = "";
                        img = null;
                        canvas = null;
                        chartObj.eq(i).remove();
                    }

                    imagePrint($('body', print_frame.contents()));

                }
                else if ($(this).hasClass('download')) {
                    $("#print-modal-mask").remove();
                    NProgress.start();
                    var chartObj = print_frame.contents().find('.highcharts-container');

                    for (var i = 0; i < chartObj.length; i++) {
                        var canvas = document.createElement("canvas");
                        var svg = chartObj.eq(i).html();
                        canvg(canvas, svg);
                        var img = $("<img />").attr({ "src": canvas.toDataURL("image/png") });
                        chartObj.eq(i).parent('div').append(img);
                        svg = "";
                        img = null;
                        canvas = null;
                        chartObj.eq(i).remove();
                    }

                    var textareaObj = print_frame.contents().find('textarea');

                    for (var i = 0; i < textareaObj.length; i++) {
                        var t = textareaObj.eq(i).text();
                        t = t.replace(/\n/gi, "<br />");
                        t = "<pre>" + t + "</pre>";

                        textareaObj.eq(i).hide();
                        textareaObj.eq(i).parent('div').append(t);
                    }

                    imageDownload($('body', print_frame.contents()), areaName);

                    print_controls.fadeOut(100);

                    $.printPreview.distroyPrintPreview();

                    NProgress.done();
                }
                else { $.printPreview.distroyPrintPreview(); }

            });
        },

        distroyPrintPreview: function () {
            print_controls.fadeOut(100);
            print_modal.animate({ top: $(window).scrollTop() - $(window).height(), opacity: 1 }, 400, 'linear', function () {
                print_modal.remove();
                $('body').css({ overflowY: 'auto', height: 'auto' });
            });
            mask.fadeOut('slow', function () {
                mask.remove();
            });

            $(document).unbind("keydown.printPreview.mask");
            mask.unbind("click.printPreview.mask");
            $(window).unbind("resize.printPreview.mask");
        },

        /* -- Mask Functions --*/
        loadMask: function () {
            size = $.printPreview.sizeUpMask();
            mask = $('<div id="print-modal-mask" />').appendTo($('body'));
            mask.css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: size[0],
                height: size[1],
                display: 'none',
                opacity: 0,
                zIndex: 9999,
                backgroundColor: '#000',
            });

            mask.css({ display: 'block' }).fadeTo('400', 0.75);

            $(window).bind("resize..printPreview.mask", function () {
                $.printPreview.updateMaskSize();
            });

            mask.bind("click.printPreview.mask", function (e) {
                $.printPreview.distroyPrintPreview();
            });

            $(document).bind("keydown.printPreview.mask", function (e) {
                if (e.keyCode == 27) { $.printPreview.distroyPrintPreview(); }
            });
        },

        sizeUpMask: function () {
            if ($.browser.msie) {
                // if there are no scrollbars then use window.height
                var d = $(document).height(), w = $(window).height();
                return [
                    window.innerWidth ||                        // ie7+
                    document.documentElement.clientWidth ||     // ie6  
                    document.body.clientWidth,                  // ie6 quirks mode
                    d - w < 20 ? w : d
                ];
            } else { return [$(document).width(), $(document).height()]; }
        },

        updateMaskSize: function () {
            var size = $.printPreview.sizeUpMask();
            mask.css({ width: size[0], height: size[1] });
        }
    }
})(jQuery);