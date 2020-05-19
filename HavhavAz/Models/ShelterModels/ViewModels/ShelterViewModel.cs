using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.ImageModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ShelterModels
{
    public class ShelterViewModel
    {
        public Shelter Shelter { get; set; }
        public ShelterTranslations ShelterTranslations { get; set; }
        public ContactsViewModel ContactsViewModel { get; set; }
        public IFormFile Image { get; set; }
        public bool IsUntranslated { get; set; }
        public IList<SelectListItem> LanguageSelectList { get; set; }

        public ShelterViewModel()
        {
            Shelter = new Shelter();
            ShelterTranslations = new ShelterTranslations();
            ContactsViewModel = new ContactsViewModel();
        }
    }
}
