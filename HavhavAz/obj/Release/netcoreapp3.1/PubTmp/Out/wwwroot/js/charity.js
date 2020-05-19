var charity_id;
var receipt_state = 1;
var isAdmin;
var af_token = $('input[name=__RequestVerificationToken]').val();

if (!isNullOrEmpty(charity_id)) {
    $("#receipt-list-modal").modal({
        fadeDuration: 250
    });
    getReceiptList();
}

$(".charity-progress-bar").each(function (index) {
    var percent = $(this).attr("data-percent");
    $(this).width(percent + '%');
});

$(".receipt-modal").click(function (e) {
    var action = $(this).attr("data-action");
    var modal = $("#receipt-" + action + "-modal");
    charity_id = $(this).attr("data-charity-id");

    if (action === "list") {
        getReceiptList();
    }

    modal.modal({
        fadeDuration: 250
    });
});

$("body").on("click", ".receipt-btn", function () {

    var action = $(this).attr("data-action");
    var ri = parseID($(this).closest("tr").attr("id"));
    var url = action === "delete" ? "Delete" : "ChangeState";

    Confirmation(function () {
        var data = {
            ri: ri,
            state: action
        };

        AjaxCall("/Receipt/" + url, af_token, data, true, "", function (result) {
            if (action === "1" && result > 0) {
                //$("#" + ri).find(".receipt-status").html("<span>Təsdiqlənib</span>");
                var charity_box = $("#charity-" + charity_id);

                var collected_amount_box = charity_box.find(".charity-collected-amount");
                var collected_amount = parseInt(collected_amount_box.text()) + result.amount;
                collected_amount_box.text(collected_amount);

                var amount = parseInt(charity_box.find(".charity-amount").text());
                var percent = collected_amount * 100 / amount;
                charity_box.find(".charity-progress-bar").width(percent + '%');
            }

            $("#receipt-" + ri).remove();
        });
    });
});


$("#receipt-form").on("submit", function (e) {
    e.preventDefault();

    var isValidated = $(this).parsley().validate();

    if (isNullOrEmpty($("#main-pic-input").val())) {
        Swal.fire({
            title: messages["error"],
            text: messages.receipt.image.required,
            type: 'error',
            confirmButtonColor: '#3085d6'
        });

        isValidated = false;
    }

    if (!isValidated) {
        return;
    }

    var formData = new FormData($(this)[0]);
    formData.append('CharityId', charity_id);

    $.ajax({
        url: "/Receipt/SendReceipt",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {

            if (data.success === true) {
                Swal.fire({
                    title: messages["success"],
                    text: messages["receiptWarning"],
                    type: 'success',
                    confirmButtonColor: '#3085d6'
                });
            } else {
                Swal.fire({
                    title: messages["error"],
                    type: 'error',
                    confirmButtonColor: '#3085d6'
                });
            }
        }
    });

    $(".close-modal")[0].click();
    $("#main-pic").attr("src", "/images/beqemot.png");
    $(this)[0].reset();
});

function getReceiptList() {
    
    if ($("#isMine-" + charity_id).val() == "True") {
        $("#receipt-state-box").show();
    } else {
        $("#receipt-state-box").hide();
    }

    $.get("/Receipt/GetList?ci=" + charity_id + "&state=" + receipt_state, function (data) {
        var table = $("#receipt-table tbody");
        table.html("");

        $.each(data.receipts, function (k, receipt) {

            receipt.name = isNullOrEmpty(receipt.name) ? messages.receipt.anonym : receipt.name;

            var receipt_list = "<tr id='receipt-" + receipt.id + "'>" +
                "<td>" +  receipt.name  + "</td>" +
                "<td>" + receipt.amount + "</td>" +
                "<td>" + receipt.date + "</td>" +
                "<td>" +
                "<a target='_blank' href='/images/charities/" + receipt.charityId + "/receipts/" + receipt.id + ".jpg'>" +
                "Göstər" +
                "</a>" +
                "</td>";
            if (receipt.state === 2) {
                receipt_list += "<td class='receipt-status'>" +
                    "<span class='btn btn-success clickable mr-2 receipt-btn' data-action='1'>Təsdiqlə</span>" +
                    "<span class='btn btn-danger clickable receipt-btn' data-action='3'>Ləğv et</span>" +
                    "</td >";
            } else if (receipt.state === 1) {
                receipt_list += "<td>" +
                    "<span>Təsdiqlənib</span>" +
                    "</td >";

            } else if (receipt.state == 3 && isAdmin) {
                receipt_list += "<td class='receipt-status'>" +
                    "<span class='btn btn-success clickable mr-2 receipt-btn' data-action='1'>Təsdiqlə</span>" +
                    "<span class='btn btn-danger clickable mr-2 receipt-btn' data-action='delete'>Sil</span>" +
                    "</td>";
            }

            if (isAdmin) {
                receipt_list += "<td>" +
                    "<span class='btn btn-danger clickable mr-2 receipt-btn' data-action='delete'>Sil</span>" +
                    "</td>";
            }

            receipt_list += "</tr>";
            table.append(receipt_list);
        });
    }, "json");
}

$("select[name='receipt-state']").on("change", function (e) {
    receipt_state = this.value;
    getReceiptList();
});

