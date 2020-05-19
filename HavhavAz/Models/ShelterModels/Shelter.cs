using HavhavAz.Helpers.Attributes;
using HavhavAz.Models.ContactsModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ShelterModels
{
    public class Shelter
    {
        [Key]
        public Int32 ID { set; get; }

        public int FoundedYear { get; set; }

        public int Position { get; set; }

        public IList<ShelterTranslations> ShelterTranslations { get; set; }

        [NotMapped]
        public Contacts Contacts { get; set; }

        public Shelter()
        {
            Position = 1;
            //FoundedDate = DateTime.Now.AddHours(11);
            ShelterTranslations = new List<ShelterTranslations>();
            Contacts = new Contacts();
        }
    }
}
