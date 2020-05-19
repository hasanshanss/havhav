using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.MessageModels
{
    public class Message
    {
        [Key]
        public Int32 ID { set; get; }

        public DateTime Date { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(2500, ErrorMessage = "StringLength")]
        public string Content { set; get; }

        [Required(ErrorMessage = "Required")]
        public bool IsSeen { set; get; }

        public DateTime SeenDate { set; get; }

        [Required(ErrorMessage = "Required")]
        public Int32 SenderId { get; set; }
        public User Sender { get; set; }

        [Required(ErrorMessage = "Required")]
        public Int32 ReceiverId { get; set; }
        public User Receiver { get; set; }

        [NotMapped]
        public string SenderUsername { get; set; }

        [NotMapped]
        public string Avatar { get; set; }

        public Message(string Content)
        {
            this.Content = Content;
            IsSeen = false;
            Date = DateTime.Now.AddHours(11).AddHours(11);
        }
    }
}
