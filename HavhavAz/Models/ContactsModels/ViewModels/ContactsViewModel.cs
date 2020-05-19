using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ContactsModels
{
    public class ContactsViewModel
    {
        public Contacts Contacts { get; set; }
        public Address Address { get; set; }
        public string[] NotDisplay { get; set; }
        public string ClassList { get; set; }

        public ContactsViewModel()
        {
            Contacts = new Contacts();
            Address = new Address();
            NotDisplay = new string[0];
        }

    }
}
