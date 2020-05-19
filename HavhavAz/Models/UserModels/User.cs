using HavhavAz.Models.AdModels;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.PostModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;
using HavhavAz.Validation;
using HavhavAz.Helpers.HtmlHelpers;
using HavhavAz.Models.MessageModels;
using HavhavAz.Helpers.Attributes;

namespace HavhavAz.Models.UserModels
{
    public class User 
    {
        [Key]
        public Int32 ID { set; get; }

        [Required(ErrorMessage = "Required")]
        [EmailAddress]
        public string Email { set; get; }

        [StringLength(1000)]
        public string Info { set; get; }

        [Required(ErrorMessage = "Required")]
        [DataType(DataType.Password)]
        [RegularExpression("^.*(?=.{8,})(?=.*\\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$", ErrorMessage ="RegexPassword")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Required")]
        [StringLengthWithMin(15, 6)]
        [RegularExpression("^[a-z0-9_-]{6,15}$", ErrorMessage = "RegexUsername")]
        public string Username { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLengthWithMin(50, 6)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Required")]
        public string Salt { get; set; }

        public DateTime BirthDate { set; get; }

        public bool DOB_Hide { set; get; } = true;

        [Required(ErrorMessage = "Required")]
        public bool Gender { get; set; }

        public string ResetPasswordCode { set; get; }

        public DateTime ResetPasswordDate { set; get; }

        public DateTime RegisteredDate { set; get; }

        [NotMapped]
        public Contacts Contacts { get; set; }

        public ICollection<Post> Posts { get; set; }
        public ICollection<Comment> Comments { get; set; }

        public ICollection<Ad> Ads { get; set; }
        public ICollection<Charity> Charities { get; set; }

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<Message> MessagesTo { get; set; }
        public ICollection<Message> MessagesFrom { get; set; }

        public enum Roles
        {
            User,
            Admin
        }

        [Required(ErrorMessage = "Required")]
        public Roles Role { get; set; }


        public User()
        {
            Role = Roles.User;
            MessagesTo = new List<Message>();
            MessagesFrom = new List<Message>();
            Charities = new List<Charity>();
            Posts = new List<Post>();
            Notifications = new List<Notification>();
            Comments = new List<Comment>();
            RegisteredDate = DateTime.Now.AddHours(11);
            BirthDate = DateTime.Now.AddHours(11);
        }

  
    }

}