using HavhavAz.Models.CommentModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.ViewComponents
{
    [ViewComponent(Name = "Comments")]
    public class CommentsViewComponent : ViewComponent
    {
        //private IStringLocalizer<SharedResource> _sharedLocalizer;

        public CommentsViewComponent()
        {
            //_sharedLocalizer = sharedLocalizer;
        }

        public IViewComponentResult Invoke(CommentViewModel model)
        {
            return View(model);
        }
    }
}
