using HavhavAz.Helpers;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using System;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;

namespace HavhavAz.Hubs
{
    public class CommentHub : Hub
    {
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        private readonly IHubContext<NotificationHub> _notHubContext;
        private IPostService _postService;
        private ICommentService _commentService;
        private INotificationService _notificationService;


        public CommentHub(IServiceWrapper services,
                          IHubContext<NotificationHub> notHubContext,
                          IStringLocalizer<SharedResource> sharedLocalizer
        )
        {
            _sharedLocalizer = sharedLocalizer;
            _notHubContext = notHubContext;
            _commentService = services.CommentService;
            _notificationService = services.NotificationService;
            _postService = services.PostService;
        }

        public async Task Send(CommentDTO commentDTO)
        {
            if (String.IsNullOrEmpty(commentDTO.Content.Trim()))
            {
                return;
            }

            var context = this.Context.GetHttpContext();

            //Send comment
            Int32 UserId = context.GetCurrentUserId();
            string Username = context.GetCurrentUsername();

            Int32.TryParse(commentDTO.PostId, out Int32 PostId);

            Comment comment = new Comment
            {
                UserId = UserId,
                Content = commentDTO.Content.Trim(),
                PostId = PostId
            };

            await this.Clients.All.SendAsync("Send", new CommentPublisher
            {
                Comment = comment,
                Publisher = Username,
                ImagePath = GetMainPic("users", Username)

            });

            //check if comment added successfully
            await _commentService.AddCommentAsync(comment);
               
            Int32 PostUserId = await _postService.GetUserIdAsync(PostId);

            //don't notificate if I comment my own Post
            if (PostUserId != UserId)
            {
                //Generate NotificationViewModel
                NotificationViewModel nvm = new NotificationViewModel
                {
                    //ID = not.ID,
                    Username = Username,
                    NotificationType = "comment",
                    SubjectName = commentDTO.PostTitle,
                    Url = $"/Post/Index/{Utilities.Slugify(commentDTO.PostTitle)}_{PostId}"
                };

                //Generate NotificationDomainModel
                Notification not = new Notification
                {
                    UserId = PostUserId,
                    AuthorId = UserId,
                    NotificationType = Notification.NotificationTypes.Comment,
                    SubjectId = PostId
                };
                await _notificationService.AddNotificationAsync(not);

                //Send notificaiton to author of post
                nvm.Description = _sharedLocalizer[$"NotificationType.Comment"];
                await _notHubContext.Clients.User(PostUserId.ToString()).SendAsync("Push", nvm);
            }
        }
    }
}
