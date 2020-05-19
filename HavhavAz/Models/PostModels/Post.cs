using HavhavAz.Models.AdModels;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HavhavAz.Models.PostModels
{
    public class Post
    {
        [Key]
        public Int32 ID { set; get; }
        
        public int Views { set; get; }

        public DateTime CreatedDate { set; get; }

        public DateTime LastActionDate { set; get; }

        public State State { get; set; }

        public Int32 SubjectId { get; set; }

        public enum PostTypes
        {
            Forum,
            Ad,
            Charity,
            News
        }

        [Required(ErrorMessage = "Required")]
        public PostTypes PostType { get; set; }

        public Int32 UserId { get; set; }
        public User User { get; set; }

        public IList<PostTranslations> PostTranslations { get; }

        public Post()
        {
            State = State.Approved;
            Views = 0;
            CreatedDate = DateTime.Now.AddHours(11);
            PostTranslations = new List<PostTranslations>();
        }
    }
}