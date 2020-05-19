using HavhavAz.Models.ImageModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.CharityModels
{
    public class CharityViewModel
    {
        public Charity Charity { get; set; }
        public ImageViewModel FormImages { get; set; }
        public int PostCount { get; set; }
        public string Publisher { get; set; }
        public Culture SelectedCulture { get; set; }
        public State SelectedState { get; set; }

        public CharityViewModel()
        {
            FormImages = new ImageViewModel();
        }
    }
}
