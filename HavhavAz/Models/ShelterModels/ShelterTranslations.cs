using HavhavAz.Helpers.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ShelterModels
{
    public class ShelterTranslations
    {
        [Key]
        public Int32 ID { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(100, ErrorMessage = "StringLength")]
        public string Name { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLengthWithMin(2500, 10)]
        public string BankCredentials { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(3000, ErrorMessage = "StringLength")]
        public string Info { set; get; }

        [Required(ErrorMessage = "Required")]
        public Culture Culture { get; set; }

        [Required(ErrorMessage = "Required")]
        public Int32 ShelterId { get; set; }
        public Shelter Shelter { get; set; }


        public ShelterTranslations()
        {

        }
    }
}
