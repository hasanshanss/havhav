using HavhavAz.Helpers.Attributes;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HavhavAz.Models.ContactsModels
{
    public class Contacts
    {
        [Key]
        public Int32 ID { set; get; }

        [StringLengthWithMin(50, 6)]
        public string Facebook { set; get; }

        [StringLengthWithMin(25, 6)]
        public string Whatsapp { set; get; }

        [StringLengthWithMin(25, 6)]
        public string Instagram { set; get; }

        [StringLengthWithMin(50, 6)]
        public string Phone { set; get; }

        public IList<Address> Addresses { get; set; }

        public Int32 SubjectId { get; set; }

        public enum SubjectTypes
        {
            User,
            Shelter,
            Vet
        }

        [Required(ErrorMessage = "Required")]
        public SubjectTypes SubjectType { get; set; }

        public Contacts()
        {
            Addresses = new List<Address>();
        }

    }
}