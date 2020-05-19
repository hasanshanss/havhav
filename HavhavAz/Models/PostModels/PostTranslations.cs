using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.PostModels
{
    public class PostTranslations
    {
        [Key]
        public Int32 ID { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(250)]
        public string Title { set; get; }

        [Required(ErrorMessage = "Required")]
        [StringLength(5000)]
        public string Content { set; get; }

        [Required(ErrorMessage = "Required")]
        public Culture Culture { get; set; }

        [Required(ErrorMessage = "Required")]
        public Int32 PostId { get; set; }
        public Post Post { get; set; }

        public PostTranslations()
        {
            
        }
    }
}
