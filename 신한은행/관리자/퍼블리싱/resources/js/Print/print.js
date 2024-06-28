// 화면을 이미지로 다운로드 한다.
function imageDownload(obj, filename) {
    html2canvas(obj, {
        onrendered: function (canvas) {
            var img = canvas.toDataURL("image/png")
            img = img.replace('data:image/png;base64,', '');

            var url = "/Capture/Capture.aspx"

            $.fileDownload(url, {
                failMessageHtml: "다운중 오류가 발생 하였습니다. 다시 한번 시도해 주세요",
                httpMethod: "POST"
                                , data: {
                                    'imageData': img
                                    , 'fileName': filename
                                }
            });

        }
    });
}

// 현재화면 print
function imagePrint(obj) {
    var url = $.url();
    var path = url.attr('path').toUpperCase();
    var folderPath = path.split("/");
    if (folderPath.length > 4 && (folderPath[3] == "HOTCOLDZONE" || folderPath[1] == "STATSHTS")) {
        //if (folderPath.length > 4 && folderPath[3] == "HOTCOLDZONE") {
        html2canvas(obj, {
            onrendered: function (canvas) {
                var img = canvas.toDataURL("image/png")
                var div = $("<div />");
                var imgstr = $("<img />");
                imgstr.attr({ "src": img });
                div.append(imgstr);
                div.jqprint();
            }
        });
    }
    else {
        obj.jqprint();
    }
}