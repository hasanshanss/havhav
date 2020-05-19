using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ForumModels
{
    public class ForumTypeTranslations
    {
        [Key]
        public Int32 ID { get; set; }

        public string Name { get; set; }

        [Required(ErrorMessage = "Required")]
        public Culture Culture { get; set; }

        public ForumType ForumType { get; set; }
        public Int32 ForumTypeId { get; set; }

        public ForumTypeTranslations()
        {
            Culture = Culture.AZ;
        }
    }
}
