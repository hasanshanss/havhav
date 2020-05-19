var messageId, receiverId, inbox;
var af_token = $('input[name="__RequestVerificationToken"]').val();

$(".box").click(function (e) {

    var modal = $("#message-modal");
    var box = $(this);
    messageId = box.attr("id");

    //if it's not messages page, then box's id equals to userId
    receiverId = $("#receiverId-" + messageId).val() || box.attr("id");

    //$("#modal-image").attr("src", $("#image-" + messageId).attr("src"));
    $("#modal-username").text($("#username-" + messageId).text());
    $("#modal-message-preview").text($("#message-" + messageId).text());

    var isOutbox = inbox == "False";

    modal.modal({
        fadeDuration: 250
    });

    if (box.hasClass("unseen") && !isOutbox) {
        
        box.removeClass("unseen");
        var msg_count = $("#message-count").text();
        var new_count = parseInt(msg_count) - 1;
        $("#message-count").text(new_count > 0 ? new_count : "");

        $.ajax({
            url: "/Account/Messages/MarkAsSeen",
            type: 'POST',
            headers: {
                'RequestVerificationToken': af_token
            },
            data: {
                messageId: messageId
            },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else if (!box.hasClass("unseen") && isOutbox) {
        var seenDate = $("#seenDate-" + messageId).val();
        $("#modal-seen-date").text(seenDate);
        $("#modal-seen-date-box").show();
    }
});


