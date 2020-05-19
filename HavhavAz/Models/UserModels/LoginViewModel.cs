using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HavhavAz.Models.UserModels
{
    public class LoginViewModel
    {
        //[Required(ErrorMessage = "Required")]
        //[Display(Name = "Email")]
        //public string Email { get; set; }

        [Required(ErrorMessage = "Required")]
        [StringLength(15, ErrorMessage = "StringLength")]
        public string Username { set; get; }

        [Required(ErrorMessage = "Required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Required")]
        public string CaptchaToken { get; set; }

        [Display(Name = "Yadda saxla?")]
        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }
    }
}