var messageId, receiverId, inbox, isAuthenticated, username;
var af_token = $('input[name="__RequestVerificationToken"]').val();

$(".message-box").click(function (e) {

    var modal = $("#message-modal");
    var box = $(this);
    messageId = parseID(box.attr("id"));
    receiverId = $("#receiverId-" + messageId).val();

    $("#modal-username").text(inbox ? $("#username-" + messageId).text() : username);
    $("#modal-message-preview").text($("#message-" + messageId).text());

    modal.modal({
        fadeDuration: 250
    });

    if (box.hasClass("unseen") && inbox) {

        box.removeClass("unseen");
        var msg_count = $("#message-count").text();
        var new_count = parseInt(msg_count) - 1;
        $("#message-count").text(new_count > 0 ? new_count : "");

        AjaxCall("/Account/Messages/MarkAsSeen", af_token, { messageId: messageId }, false, "");

    } else if (!box.hasClass("unseen") && !inbox) {
        var seenDate = $("#seenDate-" + messageId).val();
        $("#modal-seen-date").text(seenDate);
        $("#modal-seen-date-box").show();
    }
});


$(".send-message-btn").click(function (e) {

    if (isAuthenticated === false) {
        window.location.replace("/Account/Login");
    }

    var modal = $("#message-modal");

    modal.modal({
        fadeDuration: 250
    });
    
    receiverId = parseID($(this).attr("id"));
});

$("#message-form").on("submit", function (e) {
    e.preventDefault();

    var message = $("#message-textarea").val();

    if (!$(this).parsley().validate()) {
        return;
    }

    var data = {
        ReceiverId: parseInt(receiverId),
        Message: message
    };

    AjaxCall("/Account/SendMessage", af_token, data, true, "message", function (result) {
        $("#message-textarea").val("");
        $(".close-modal")[0].click();
    });
});






