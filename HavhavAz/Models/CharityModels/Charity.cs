using HavhavAz.Helpers.Attributes;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HavhavAz.Models.CharityModels
{
    public class Charity
    {
        [Key]
        public Int32 ID { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLengthWithMin(25, 3)]
        public string Name { set; get; }

        [Required(ErrorMessage = "Required")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "This field must be numeric")]
        public int Amount { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(6000, ErrorMessage = "StringLength")]
        public string Info { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLengthWithMin(2000, 10)]
        public string BankCredentials { set; get; }

        public int CollectedAmount { set; get; }

        public DateTime CreatedDate { set; get; }

        public DateTime LastActionDate { set; get; }

        public State State { get; set; }

        public Int32 UserId { get; set; }
        public User User { get; set; }


        [Required(ErrorMessage = "Required")]
        public ICollection<Receipt> Receipts { get; set; }

        public Charity()
        {
            State = State.Pending;
            CreatedDate = DateTime.Now.AddHours(11);
            LastActionDate = DateTime.Now.AddHours(11);
            Receipts = new List<Receipt>();
        }

        
       
    }
}