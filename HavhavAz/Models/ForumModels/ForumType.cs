using HavhavAz.Models.PostModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ForumModels
{
    public class ForumType
    {
        [Key]
        public Int32 ID { get; set; }

        public int Position { get; set; }

        public ICollection<ForumTypeTranslations> ForumTypeTranslations { get; set; }

        public ForumType()
        {
            Position = 1;
            ForumTypeTranslations = new List<ForumTypeTranslations>();
        }
    }
}
