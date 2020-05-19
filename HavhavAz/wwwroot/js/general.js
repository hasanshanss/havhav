const urlParams = new URLSearchParams(window.location.search);
const general_state = urlParams.get('state') || 1;
var locale;

$(function () {

    $('[data-toggle="tooltip"]').tooltip();

    $(".datePicker").datetimepicker({
        locale: locale,
        format: 'DD.MM.YYYY',
        useCurrent: false,
        maxDate: moment()
        
    });
});

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}

function appendLeadingZeroes(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n;
}

function parseID(id) {
    id = id.split("-");
    return parseInt(id[id.length - 1]);
}

$(".switcher").on("click", function () {
    var radio = $(this)[0];
    $(radio).val(this.checked ? 'True' : 'False');
});

$(".img-autoload").click(function () {
    $("input[id='" + $(this).attr("id") + "-input']").click();
});

$(".img-autoload-input").change(function () {
    var img_id = $(this).attr('id').replace("-input", "");
    var img = $("#" + img_id);
    
    if (fileValidation(this)) {
        readURL(this, img);
        $("#" + img_id).removeClass();
    }
});


function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}



function readURL(input, img) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            var src = e.target.result;
            img.attr('src', src.includes("image") ? src : "/images/video_thumbnail.png");
        };

        reader.readAsDataURL(input.files[0]);
    }
}


function fileValidation(input, isGallery = false) {

    var file = null;

    var filePath = input.value;
    var extension = filePath.split('.').pop();
    var isVideo = extension === "mp4" ? true : false; 
    var limitSize = isVideo ? 2000 * 10000 : 2000 * 1000;

    if (isGallery) {
        var allowedExtensions = /(\.jpg|\.mp4|\.)$/i;
    } else {
        allowedExtensions = /(\.jpg|\.)$/i;
    }

    if (!window.FileReader) {
        Swal.fire({
            title: messages.warning,
            type: 'warning',
            text: messages.validation.media.not_supported,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });
        
        return false;
    }
    if (!input) {
        Swal.fire({
            title: messages.error,
            type: 'error',
            text: messages.validation.media.not_found,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });
        
        return false;
    }
    else if (!input.files) {

        Swal.fire({
            title: messages.error,
            type: 'error',
            text: messages.validation.media.not_supported,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });
        return false;
    }
    //else if (!input.files[0]) {
    //    alert("Please select a file before clicking 'Load'");
    //}
    else {
        file = input.files[0];
    }

    if (file === null) {
        alert("file is null");
        return false;
    }
        

    if (file.size > limitSize) {

        if (!isGallery || !isVideo) {
            var subject = "image";
            var size = "2";
        } else {
            subject = "video";
            size = "20";
        }

        Swal.fire({
            title: messages.error,
            type: 'error',
            text: messages.validation.media.constraints.size.format(size),
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });

        
        return false;
    }
    if (!allowedExtensions.exec(filePath)) {

        Swal.fire({
            title: messages.error,
            type: 'error',
            text: messages.validation.media.constraints.extension.format((isGallery ? ".jpeg, .jpg, .mp4" : ".jpeg, .jpg")),
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });

        input.value = '';
        return false;
    }

    return true;
}

$("select[name='forum-topic']").on("change", function () {
    window.location.replace(updateQueryStringParameter(window.location.href, "fci", this.value));
});

$("select[name='culture']").on("change", function () {
    window.location.replace(updateQueryStringParameter(window.location.href, "culture", this.value));
});

$("select[name='state']").on("change", function () {
    window.location.replace(updateQueryStringParameter(window.location.href, "state", this.value));
});

$(".change-state").on("click", function (e) {
    changeStatus(e);
});

$("select[name='private-state']").on("change", function (e) {
    if (!changeStatus(e, this.value)) {
        $(this).prop('selectedIndex', general_state);
    }
});


function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

function isNullOrEmpty(obj) {
    return obj === null || obj === "" || typeof obj === 'undefined';
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

function isHtmlEmpty(el) {
    return !$.trim(el.html())
}

function countLines() {

    var x = document.getElementsByClassName("with-dots");

    for (i = 0; i < x.length; i++) {

        var info_div = x[i];

        var divHeight = info_div.offsetHeight;
        console.log(divHeight);

        var lineHeight = parseInt($(info_div).css('line-height'));
        console.log(lineHeight);

        var lines = divHeight / lineHeight;
        console.log(lines);

        if (lines > 7) {
            $(`#show-more-btn-${parseID(info_div.id)}`).show();
        }
    }
}

