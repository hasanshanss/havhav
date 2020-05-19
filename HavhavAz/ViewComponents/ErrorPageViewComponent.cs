using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.ViewComponents
{
    [ViewComponent(Name = "ErrorPage")]
    public class ErrorPageViewComponent : ViewComponent
    {
        //private IStringLocalizer<SharedResource> _sharedLocalizer;
        public ErrorPageViewComponent()
        {
            //_sharedLocalizer = sharedLocalizer;
        }

        public IViewComponentResult Invoke(string error)
        {
            return View(String.Empty, error);
        }
    }
}
