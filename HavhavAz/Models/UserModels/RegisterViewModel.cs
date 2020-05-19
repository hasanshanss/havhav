using HavhavAz.Helpers.Attributes;
using HavhavAz.Models.ContactsModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.UserModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Required")]
        [EmailAddress(ErrorMessage = "EmailAddress")]
        public string Email { set; get; }

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
        [StringLengthWithMin(25, 6)]
        public string Username { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLengthWithMin(50, 6)]
        public string Name { get; set; }

        public DateTime BirthDate { set; get; } = DateTime.Now.AddHours(11);

        public bool DOB_Hide { set; get; } = false;

        [Required(ErrorMessage = "Required")]
        public bool Gender { get; set; }

        [StringLength(2000, ErrorMessage = "StringLength")]
        public string Info { set; get; }

        public ContactsViewModel ContactsViewModel { get; set; }

        [Required(ErrorMessage = "Required")]
        public string CaptchaToken { get; set; }

        public IFormFile Image { get; set; }

        public RegisterViewModel()
        {
            ContactsViewModel = new ContactsViewModel() { NotDisplay = new string[] { "address" } };
        }
    }
}
