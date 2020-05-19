using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.VetModels
{
    public class VetTranslations
    {
        [Key]
        public Int32 ID { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(100, ErrorMessage = "StringLength")]
        public string Name { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(3000, ErrorMessage = "StringLength")]
        public string Info { set; get; }

        [Required(ErrorMessage = "Required")]
        public Culture Culture { get; set; }

        
        public Int32 VetId { get; set; }
        public Vet Vet { get; set; }


        public VetTranslations()
        {

        }
    }
}
