using HavhavAz.Models.ImageModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.AdModels
{
    public class AdViewModel
    {
        public Ad Ad { get; set; }
        public ImageViewModel FormImages { get; set; }
        public ICollection<SelectListItem> AdTypes { get; set; }
        public int PostCount { get; set; }
        public string Publisher { get; set; }
        public Culture SelectedCulture { get; set; }

        //public byte SelectedAdType { get; set; }

        public AdViewModel()
        {
            FormImages = new ImageViewModel();
            Ad = new Ad();
        }
    }
}
