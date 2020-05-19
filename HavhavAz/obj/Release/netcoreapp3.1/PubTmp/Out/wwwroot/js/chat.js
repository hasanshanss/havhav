var message_box = document.querySelector('.messagebox');
var main_message_box = document.getElementById("main-messagebox");
var comment_list = document.getElementsByClassName("user_comment")[0];


var new_comment_str = '<div class="col-3 col-sm-2 col-md-2 col-lg-1 mt-4">' +
    '                                    <div class="user_avatar">' +
    '                                       <img alt="Azərbaycanda heyvansevərlər üçün ilk və tək sosial şəbəkə" src="" class="user_img" width="50" height="50">' +
    '                                   </div>' +
    '                               </div>' +
    '                            </div>' +
    '                            <div class="col-9 col-sm-10 col-md-11">' +
    '                                <div class="comment_body">' +
    '                                   <div>' +
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

let chatHubUrl = 'http://www.havhav.az/chat';
//let chatHubUrl = 'http://localhost:57196/chat';
const chatHubConnection = new signalR.HubConnectionBuilder()
    .withUrl(chatHubUrl)
    .configureLogging(signalR.LogLevel.Information)
    .build();

chatHubConnection.start();

chatHubConnection.on("updateCount", function (count) {
    $("#next-title").text("(" + count + ")");
});

chatHubConnection.on("Send", function (cm) {
    generateChatMessage(cm);
});

message_box.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter

        if (!isAuth) {
            window.location.replace("/Account/Login");
        } else {
            if (!isNullOrEmpty(this.value.trim())) {
                chatHubConnection.invoke("Send", this.value);
            }
        }
    }
});


function generateChatMessage(cm) {
    
    var message = cm.content;
    var message_box = document.getElementsByClassName("messagebox")[0];
    message_box.value = '';

    var new_comment = document.createElement("div");
    new_comment.classList += `row ${cm.publisher === username ? 'flex-row-reverse' : ''}`;
    new_comment.innerHTML = new_comment_str;

    var new_comment_time = new_comment.getElementsByClassName("comment-time")[0];
    var new_comment_date = new_comment.getElementsByClassName("comment-date")[0];
    var new_comment_body = new_comment.getElementsByClassName("comment_body")[0];


    var date = new Date();
    new_comment_time.innerHTML = date.getHours() + ":" + appendLeadingZeroes((date.getMinutes()));
    new_comment_date.innerHTML = appendLeadingZeroes((date.getUTCDate())) + "." + appendLeadingZeroes(date.getMonth() + 1) + "." + date.getFullYear();

    var paragraph = new_comment_body.getElementsByTagName("p")[0];
    paragraph.innerHTML = escapeHtml(message);

    new_comment.getElementsByClassName("user_img")[0].src = "/images/" + cm.imagePath;
    new_comment.getElementsByClassName("user_name")[0].innerHTML = cm.publisher;
    new_comment.getElementsByClassName("publisher_url")[0].href = "/Account/Index/" + cm.publisher;

    var li = document.createElement("li");
    li.innerHTML = new_comment.outerHTML;

    comment_list.appendChild(li);
    $("#nobodyText").remove();
}
