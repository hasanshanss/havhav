using HavhavAz.Models.ImageModels;
using HavhavAz.Models.PostModels;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ForumModels
{
    public class ForumViewModel
    {
        public IndexViewModel<PostViewModel> Posts { get; set; }
        public PostViewModel PostViewModel { get; set; }

        public ImageViewModel FormImages { get; set; }

        public ICollection<SelectListItem> ForumTypeSelectList { get; set; }
        public Int32 SelectedCategory { set; get; }

        public ForumViewModel()
        {
            
        }
    }
}
