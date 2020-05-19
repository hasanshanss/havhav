using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.CommentModels
{
    public class Comment
    {
        [Key]
        public Int32 ID { set; get; }

        public DateTime Date { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(2500, ErrorMessage = "StringLength")]
        public string Content { set; get; }

        [Required(ErrorMessage = "Required")]
        public Int32 PostId { get; set; }
        public Post Post { get; set; }

        [Required(ErrorMessage = "Required")]
        public Int32 UserId { get; set; }
        public User User { get; set; }

        //[NotMapped]
        //public string Publisher { get; set; }

        public Comment()
        {
            Date = DateTime.Now.AddHours(11);
        }
    }
}
