using HavhavAz.Models.ContactsModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.UserModels
{
    public class UserViewModel
    {
        public User User { get; set; }
        //public Contacts Contacts { get; set; }
        public IFormFile Image { get; set; }


    }
}
