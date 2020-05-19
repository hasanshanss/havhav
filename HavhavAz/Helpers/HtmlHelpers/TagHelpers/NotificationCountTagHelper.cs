using HavhavAz.Models.NotificationModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HavhavAz.Helpers.HtmlHelpers.TagHelpers
{
    public class NotificationCountTagHelper : TagHelper
    {
        private IMessageService _messageService;
        private INotificationService _notificationService;

        public NotificationCountTagHelper(IServiceWrapper services)
        {
            _messageService = services.MessageService;
            _notificationService = services.NotificationService;
        }

        public string Type { get; set; }
        //[HtmlAttributeName("user-id")]
        public string UserId { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            Int32.TryParse(UserId, out Int32 UserIdInt32);
            int? count = 0;
            switch (Type)
            {
                case "notification":
                    count =  _notificationService.GetNotificationCount(m => m.UserId == UserIdInt32 && m.IsViewed == false);
                    break;
                case "message":
                    count = _messageService.GetCount(UserIdInt32, true);
                    break;
            }

            output.TagName = "span";
            output.Attributes.Add("id", $"{Type}-count");
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(count != 0 ? count.ToString() : String.Empty);
        }
      
    }
}
