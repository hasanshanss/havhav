using HavhavAz.Models.ImageModels;
using HavhavAz.Models.CommentModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HavhavAz.Models.PostModels
{
    public class PostViewModel
    {
        public Post Post { get; set; }
        public PostTranslations PostTranslations { get; set; }
        public ImageViewModel FormImages { get; set; }
        public string Publisher { get; set; }
        public CommentViewModel CommentViewModel { get; set; }
        public bool IsMine { get; set; }
        public bool IsUntranslated { get; set; }

        public Culture SelectedCulture { get; set; }

        public IList<Culture> ExistedCultures { get; set; }
        public PostViewModel()
        {
            //CommentViewModel = new CommentViewModel();
            //CommentViewModel.Comments = new List<Comment>();
        }
    }
}