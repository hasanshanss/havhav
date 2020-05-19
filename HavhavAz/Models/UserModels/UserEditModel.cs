using HavhavAz.Models.ContactsModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.UserModels
{
    public class UserEditModel
    {
        public Int32 ID { get;set;}
        public string Info { get; set; }
        //public bool Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public bool DOB_Hide { get; set; }
        public ContactsViewModel ContactsViewModel { get; set; }
        public IFormFile Image { get; set; }
    }
}
