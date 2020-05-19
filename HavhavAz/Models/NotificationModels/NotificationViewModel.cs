using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.NotificationModels
{
    public class NotificationViewModel
    {
        public Int32 ID { get; set; }
        public string NotificationType { get; set; }
        public string MessageReceiverId { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Icon { get; set; }
        public string NotText { get; set; }

        public string Url { get; set; }
        public string Description { get; set; }
        public string SubjectName { get; set; }
        //public DateTime ActionDate { get; set; }

        public Notification Not{ get; set; }
    }
}
