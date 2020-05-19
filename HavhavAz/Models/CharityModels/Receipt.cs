using HavhavAz.Models.CharityModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HavhavAz.Models.CharityModels
{
    public class Receipt
    {
        [Key]
        public Int32 ID { set; get; }

        [StringLength(20)]
        public string Name { set; get; }

        [Required(ErrorMessage = "Required")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "UPRN must be numeric")]
        public int Amount { set; get; }

        [Required(ErrorMessage = "Required")]
        public DateTime Date { get; set; }

        public Int32 CharityId { get; set; }
        public Charity Charity { get; set; }

        public State State { get; set; }

        public Receipt()
        {
            this.CharityId = CharityId;
            Date = DateTime.Today;
            State = State.Pending;
        }
    }
}