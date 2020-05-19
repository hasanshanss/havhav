using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.UserModels
{
    public class UserSecurityModel
    {
        public Int32 ID { get; set; }

        [Required(ErrorMessage = "Required")]
        [EmailAddress(ErrorMessage = "EmailAddress")]
        public string Email { get; set; }
        
        //[DataType(DataType.Password)]
        //public string OldPassword { set; get; }

        [Required(ErrorMessage = "Required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Required")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "PasswordMinLength")]
        [DataType(DataType.Password)]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "PasswordCompare")]
        public string ConfirmPassword { get; set; }
    }
}
