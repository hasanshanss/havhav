using HavhavAz.Models.ImageModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.ViewComponents
{
    [ViewComponent(Name = "Images")]
    public class ImagesViewComponent : ViewComponent
    {
        
        public ImagesViewComponent()
        {
        }

        public IViewComponentResult Invoke(string action, string path)
        {
            return View(action, path);
        }
    }
}
