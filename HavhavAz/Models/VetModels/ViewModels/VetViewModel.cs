using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.ImageModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.VetModels
{
    public class VetViewModel
    {
        public Vet Vet { get; set; }
        public VetTranslations VetTranslations { get; set; }
        public ContactsViewModel ContactsViewModel { get; set; }
        public IFormFile Image { get; set; }
        public Culture SelectedCulture { get; set; }
        public bool IsUntranslated { get; set; }

        public IList<SelectListItem> LanguageSelectList { get; set; }

        public VetViewModel()
        {
            Vet = new Vet();
            VetTranslations = new VetTranslations();
            ContactsViewModel = new ContactsViewModel();
        }
    }
}
