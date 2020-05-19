var message_box = document.querySelector('.messagebox');
var main_message_box = document.getElementById("main-messagebox");
var comment_list = document.getElementsByClassName("user_comment")[0];
var post_id;
var post_title;
var af_token = $("input[name='__RequestVerificationToken']").val();


var new_comment_str = '<div class="col-3 col-sm-2 col-md-2 col-lg-1 mt-4">' +
    '                                    <div class="user_avatar">' +
    '                                       <img alt="Azərbaycanda heyvansevərlər üçün ilk və tək sosial şəbəkə" src="" class="user_img" width="50" height="50">' +
    '                                   </div>' +
    '                               </div>' +
    '                            </div>' +
    '                            <div class="col-9 col-sm-10 col-md-11">' +
    '                                <div class="comment_body">' +
    '                                   <div>' +
    '                                       <span class="comment-delete orange clickable" style="float:right; display:none;">x</span>' +
    '                                      <a href="" class="publisher_url orange">' +
    '                                               <span class="user_name" style="font-size:13px; word-break:break-all;"></span>' +
    '                                       </a>' +
    '                                   </div>' +
    '                                <p class="wrappable"></p>' +
    '                                <div class="row comment_toolbar">' +
    '                                    <div class="col-12 col-md-12">' +
    '                                        <div class="comment_tools text-right">' +
    '                                            <ul>' +
    '                                                <li>' +
    '                                                    <i class="fa fa-clock-o icon"></i> <span class="comment-time"></span>' +
    '                                                </li>' +
    '                                                <li>' +
    '                                                    <i class="fa fa-calendar icon"></i> <span class="comment-date"></span>' +
    '                                                </li>' +
    '                                            </ul>' +
    '                                        </div>' +
    '                                    </div>' +
    '                                </div>' +
    '                                </div>' +
    '                            </div>';

let commentHubUrl = 'http://www.havhav.az/comment';
const commentHubConnection = new signalR.HubConnectionBuilder()
    .withUrl(commentHubUrl)
    .configureLogging(signalR.LogLevel.Information)
    .build();

commentHubConnection.start();


commentHubConnection.on("Send", function (cp) {

    generateComment(cp);
    
});

message_box.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        var commentDTO = {
            "PostId": post_id,
            "Content": this.value,
            "PostTitle": post_title
        };

        if (!isAuth) {
            window.location.replace("/Account/Login");
        } else {

            if (!isNullOrEmpty(this.value.trim())) {
                commentHubConnection.invoke("Send", commentDTO);
            }

        }
    }
});


var skip = 5;
function showMore() {
    var data = {
        postId: post_id,
        skip: parseInt(skip)
    };

    AjaxCall('/Post/ShowMoreComments', af_token, data, false, "", function (result) {
        result.commentPublisherList.forEach(function (cp, index, arr) {
            generateComment(cp, false);
        });
        skip += 5;

        if (result.hasNext === false) {
            $("#showMore").remove();
        }
    });

    
}

function generateComment(cp, isAfter = true) {
    var comment = cp.comment;
    var message_box = document.getElementsByClassName("messagebox")[0];
    message_box.value = '';
    
    var last_comment = comment_list.lastElementChild;
    var last_comment_id = last_comment !== null ? last_comment.getElementsByClassName("comment_body").id : 0;

    var new_comment = document.createElement("div");
    new_comment.classList += "row";
    new_comment.innerHTML = new_comment_str;

    var new_comment_time = new_comment.getElementsByClassName("comment-time")[0];
    var new_comment_date = new_comment.getElementsByClassName("comment-date")[0];
    var new_comment_body = new_comment.getElementsByClassName("comment_body")[0];

    var date = new Date(Date.parse(comment.date));
    new_comment_time.innerHTML = date.getHours() + ":" + appendLeadingZeroes((date.getMinutes()));
    new_comment_date.innerHTML = appendLeadingZeroes((date.getUTCDate())) + "." + appendLeadingZeroes(date.getMonth() + 1) + "." + date.getFullYear();

    new_comment_body.id = "comment-" + comment.id;

    var paragraph = new_comment_body.getElementsByTagName("p")[0];
    paragraph.innerHTML = escapeHtml(comment.content);

    new_comment.getElementsByClassName("user_img")[0].src = "/images/" + cp.imagePath;
    new_comment.getElementsByClassName("user_name")[0].innerHTML =  cp.publisher;
    new_comment.getElementsByClassName("publisher_url")[0].href = "/Account/Index/" + cp.publisher;

    if (cp.publisher === username) {
        new_comment.getElementsByClassName("comment-delete")[0].style.display = "block";
    }
    
    var li = document.createElement("li");
    li.innerHTML = new_comment.outerHTML;

    if (isAfter) {
        comment_list.appendChild(li);
    } else {
        comment_list.prepend(li);
    }

    $("#firstCommentText").remove();
}

$("body").on("click", ".comment-delete", (function (e) {

    var target = $(e.currentTarget);
    var comment_id = target.closest(".comment_body")[0].id;

    Confirmation(function () {
        AjaxCall('/Post/RemoveComment', af_token, parseID(comment_id), true, "", function () {
            target.closest("li").remove();
        })
    });
}));