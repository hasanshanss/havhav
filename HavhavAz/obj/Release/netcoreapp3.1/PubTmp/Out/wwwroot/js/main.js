var af_token = $("input[name=__RequestVerificationToken]").val();
var isAuth, isAdmin, username;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var isRedirect = false;

    
function toggler(divId) {
    $("#" + divId).toggle();
}


$(".open-modal").click(function (e) {
    $("#menu").modal({
        fadeDuration: 250
    });
});

$(".menu-box").each(function (index) {
    var menuBox = $(this);
    if (menuBox.attr('data-message').length > 10)
        menuBox.toggleClass('small-title');
});

let notificationHub = 'http://havhav.az/notification';
const notConnection = new signalR.HubConnectionBuilder()
    .withUrl(notificationHub)
    .configureLogging(signalR.LogLevel.Information)
    .build();

notConnection.start();

notConnection.on("Push", function (nvm) {
    
    if (nvm === null) {
        var warning_modal = $("#warning");
        warning_modal.find("h2").text("");

        warning_modal.modal({
            fadeDuration: 250
        });
    }

    const icons =
    {
        "comment": "far fa-comment",
        "message": "fas fa-envelope",
        "receipt": "fas fa-hand-holding-usd"
    };

    var count_box = document.getElementById((nvm.notificationType == "message" ? nvm.notificationType : "notification") + "-count");

    var count = parseInt(count_box.innerText) || 0;
    count++;
    count_box.innerText = count;

    var href = document.createElement("a");
    href.classList += "button orange clickable not-button";
    href.href = nvm.url;

    var li = document.createElement("li");
    var not_text = "<i class='" + icons[nvm.notificationType] + "'></i> <strong>" + nvm.username + "</strong> " + nvm.description;

    not_text += !isNullOrEmpty(nvm.subjectName) ? (":  <span class='text-preview' style='max-width:200px; color:white; position:relative; top:6px;'>" + nvm.subjectName) + "</span>" : "";

    href.innerHTML = not_text;
    li.appendChild(href);

    var not_list = document.getElementsByClassName("not-list")[0];
    not_list.appendChild(li);

    setTimeout(function () {
        $(li).fadeOut();
    }, 5000);
});


$("body").on("click", ".gallery-img", function (event) {
    $("#gallery-" + parseID($(this).attr('id'))).click();
});

$("body").on("change", "input[name$='FormImages.Gallery']", function () {
    if ($(this).val() !== "") {
        if (fileValidation(this, true)) {
            var id = parseID($(this).attr('id'));
            var new_id = id + 1;

            var div = $("#gallery-img-" + id);
            var img = div.find("img");
            var img_box;

            if (img.length < 1) {

                img_box = $('<div class="col-md-3 img-box-2 gallery-img clickable" id="gallery-img-' + id + '">' +
                    '<span class="img-remove-btn">&times;</span>' +
                    '<img alt="Azərbaycanda heyvansevərlər üçün ilk və tək sosial şəbəkə" class="cb-img-thumb">' +
                    '</div>');

                img_box.insertBefore(div);
                div.attr('id', 'gallery-img-' + new_id);

                $(".gallery-inputs").append('<input type="file" id="gallery-' + new_id + '" name="FormImages.Gallery" style="display:none">');

            } else {
                img_box = div;
            }
            readURL(this, img_box.find('img'));
        }

    }
});

$("body").on("click", ".img-remove-btn", function (e) {
    e.stopPropagation();
    e.preventDefault();

    var img_box = $(this).closest(".img-box-2");
    var filename = img_box.attr("id");

    img_box.remove();

    if (!filename.includes("gallery-img"))
        $(".deleted-imgs").append("<input type='hidden' name='FormImages.DeletedImages' value='" + filename + "'>");
    else {
        $("#gallery-" + parseID(filename)).remove();
    }

});

function changeStatus(e, state) {

    var target = $(e.currentTarget);
    var model_name = target.data("model-name");
    var model_id = target.data("model-id");
    var action = isNullOrEmpty(state) ? target.data("action") : state;

    var isAdmin = target.data("admin");
    var url = (isAdmin === "True" && action === "Deleted") ? "Delete" : "ChangeState";
    
    Confirmation(function () {

        var data = {
            id: model_id,
            state: action
        };

        AjaxCall(`/${model_name}/${url}`, af_token, data, true, action.toLowerCase(), function (result) {
            if (!isNullOrEmpty(result.redirect) && isRedirect) {
                window.location.replace(result.redirect);
            } else {
                target.closest(".box").remove();
            }
        });

    });
}

$("#approve-all").click(function (e) {
    var target = $(e.currentTarget);
    actionAll(target.data("model-name"), "ApproveAll");
});

$("#delete-all").click(function (e) {
    var target = $(e.currentTarget);
    actionAll(target.data("model-name"), "DeleteAll");
});

function actionAll(modelName, action) {

    var id_list = [];

    $(".box").each(function () {
        id_list.push(parseID($(this).attr("id")));
    });

    Confirmation(function () {
        AjaxCall(`/${modelName}/${action}`, af_token, { id_list: id_list }, false, "", function (result) {
            location.reload();
        })
    });
}

$(".search-icon").on("click", (e) => {

    var clicked_element = $(e.currentTarget);
    clicked_element.toggleClass("active");

    var isUserSearch = clicked_element.hasClass("fa-user");

    var id = isUserSearch ? "newspaper" : "user";
    var action = isUserSearch ? "/Post" : "/Account";

    $("#" + id + "-search").toggleClass("active");

    $("#search-form").attr("action", action);
});

function AjaxCall(url, af_token, data, is_swal, success_text, success_callback)
{
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            //"Accept": "application/json",
            'RequestVerificationToken': af_token
        },
        data: data,
        success: function (data) {
            
            if (is_swal) {
                Swal.fire({
                    title: messages["success"],
                    text: isNullOrEmpty(success_text) ? "" : messages[success_text].success,
                    type: 'success',
                    confirmButtonColor: '#3085d6'
                });
            }

            success_callback(data);
        },
        error: function (error) {
            
            Swal.fire({
                title: messages["error"],
                text: error.responseText || messages.error_handling.server_error,
                type: 'error',
                confirmButtonColor: '#3085d6'
            });

            $(".close-modal")[0].click();
        }
    });
}

function Confirmation(confirm_action) {
    Swal.fire({
        title: messages.confirmation,
        //text: action_message.confirmation,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: messages.accept,
        cancelButtonText: messages.cancel
    }).then((confirmation) => {
        if (confirmation.value) {
            confirm_action();
        } else {
            return false;
        }
    });
}

$("#logout").on("click", function () {
    $("#logout-form").submit();
});


$(".show-more").on("click", function () {
    var id = parseID($(this).attr('id'));
    $(this).hide();
    $(`#info-txt-${id}`).removeClass("with-dots");
});
