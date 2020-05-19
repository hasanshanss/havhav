using HavhavAz.Models.ContactsModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.VetModels
{
    public class Vet
    {
        [Key]
        public Int32 ID { set; get; }

        public int FoundedYear { get; set; }

        public int Position { get; set; }

        public IList<VetTranslations> VetTranslations { get; set; }

        [NotMapped]
        public Contacts Contacts { get; set; }

        public Vet()
        {
            Position = 1;
            //FoundedDate = DateTime.Now.AddHours(11);
            VetTranslations = new List<VetTranslations>();
        }
    }
}
