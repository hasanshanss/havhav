using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ContactsModels
{
    public class Address
    {
        [Key]
        public Int32 ID { set; get; }

        [StringLength(500, ErrorMessage = "StringLength")]
        public string Location { set; get; }

        [Required(ErrorMessage = "Required")]
        public Culture Culture { get; set; }

        public Contacts Contacts { get; set; }
        public Int32 ContactsId { get; set; }

        public Address()
        {
            Culture = Culture.AZ;
        }
    }
}
