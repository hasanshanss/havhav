function updateQueryString(key, value, uri) {
    uri = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + "=" + value + '$2');
        window.location.replace(uri);
    }
    else {
        uri = uri + separator + key + "=" + value;
        window.location.replace(uri);
    }
}
$("body").on("click", "#cb-save-btn", function () {
    var info_text = $("#cb-textarea").text();
    var p = "<p class='cb-info-text'>" + info_text + "</p>";
    $("#cb-textarea-box").replaceWith(p);
});



$('#filter-selectbox').on("change", (function () {
    updateQueryString("IsAccepted", $(this).val());
}));

$(".charity-progress").hover(function (ev) {
    $('#tooltip').stop(true, true).fadeIn();
}, function (ev) {
    $('#tooltip').stop(true, true).fadeOut();
}).mousemove(function (ev) {
    $('#tooltip').css({ left: ev.layerX - 50, top: ev.layerY - 50 });
    });


var my_time;
var direction = 0;
var objDiv = document.getElementById("tooltip");

function pageScroll() {
    if (direction === 0) {
        pgscrolinc();
    } else {
        pgscroldec();
    }

    my_time = setTimeout('pageScroll()', 150);
}

function pgscrolinc() {
    objDiv.scrollTop = objDiv.scrollTop + 1;
    if (objDiv.scrollTop === objDiv.scrollHeight-196)
        direction = 1;
}

function pgscroldec() {
    objDiv.scrollTop = objDiv.scrollTop - 1;
    if (objDiv.scrollTop === 0)
        direction = 0;
}

$("#cb-info-text").contentEditable = true;