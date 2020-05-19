using HavhavAz.Helpers.Attributes;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HavhavAz.Models.AdModels
{
    public class Ad
    {
        [Key]
        public Int32 ID { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(6000, ErrorMessage = "StringLength")]
        public string Info { set; get; }

        public DateTime CreatedDate { set; get; }

        public DateTime LastActionDate { set; get; }

        public State State { get; set; }

        [Required(ErrorMessage = "Required")]
        [StringLengthWithMin(25, 3)]
        public string Name { set; get; }

        [StringLengthWithMin(50, 2)]
        public string Color { set; get; }

        [StringLengthWithMin(50, 3)]
        public string Breed { set; get; }

        public bool Gender { set; get; }

        public byte AgeYear { set; get; } = 0;

        public byte AgeMonth { set; get; } = 0;

        public enum AdTypes
        {
            LFO = 1,
            Wanted,
            Mating
        }

        [Required(ErrorMessage = "Required")]
        public AdTypes AdType{ get; set; }

        public Int32 UserId { get; set; }
        public User User { get; set; }

        public Ad()
        {
            State = State.Pending;
            CreatedDate = DateTime.Now.AddHours(11);
            LastActionDate = DateTime.Now.AddHours(11);
        }
    }
}