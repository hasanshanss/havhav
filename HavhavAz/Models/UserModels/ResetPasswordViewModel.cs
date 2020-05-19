using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.UserModels
{
    public class ResetPasswordViewModel
    {
        [Required(ErrorMessage = "Required")]
        [DataType(DataType.Password)]
        [RegularExpression("^.*(?=.{8,})(?=.*\\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$",
         ErrorMessage = "RegexPassword")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Required")]
        [DataType(DataType.Password)]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "PasswordCompare")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Required")]
        public string ResetPasswordCode { get; set; }

        public string Username { get; set; }
    }
}
