using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.NotificationModels
{
    public class Notification
    {
        [Key]
        public Int32 ID { set; get; }

        [Required(ErrorMessage = "Required")]
        public Int32 SubjectId { set; get; }

        [Required(ErrorMessage = "Required")]
        public Int32 AuthorId { set; get; }

        public enum NotificationTypes
        {
            Comment,
            Message,
            Receipt
        }

        [Required(ErrorMessage = "Required")]
        public NotificationTypes NotificationType { get; set; }

        [Required(ErrorMessage = "Required")]
        public Int32 UserId { set; get; }
        public User User { set; get; }

        [Required(ErrorMessage = "Required")]
        public bool IsViewed { set; get; }

        public DateTime CreatedDate { set; get; }

        public Notification()
        {
            CreatedDate = DateTime.Now.AddHours(11);
            IsViewed = false;
        }

    }
}
