using HavhavAz.Helpers;
using HavhavAz.Models;
using HavhavAz.Models.ForumModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using HavhavAz.Validation;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;

namespace HavhavAz.Controllers
{
    

    public class ForumController : Controller
    {
        //private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        private readonly IStringLocalizer<ValidationMessages> _validationLocalizer;

        private IList<PostViewModel> _postViewModelList;
        private ICRUDService<Post> _postCrudService;
        private ITypeService<ForumType> _forumTypeService;
        private ICommentService _commentService;
        private IPostService _postService;
        private IUserManager<User> _UserManager;


        public ForumController(IServiceWrapper services,
                               IStringLocalizer<ValidationMessages> validationLocalizer)
        {
            _forumTypeService = services.ForumTypeService;
            _postCrudService = services.PostCRUDService;
            _commentService = services.CommentService;
            _postService = services.PostService;
            _UserManager = services.UserManager;
            _validationLocalizer = validationLocalizer;
        }

        public async Task<IActionResult> Index(string keyword, Int32 fti = 1, int page = 1)
        {
            Culture culture = HttpContext.GetCurrentCulture();
            //get forumtypes' selectlist
            ICollection<SelectListItem> forumTypeSelectList = await _forumTypeService.GetSelectListAsync(culture);

            //get all posts by type
            Expression<Func<Post, bool>> lambda = m => m.PostType == Post.PostTypes.Forum && m.SubjectId == fti;

            //generate viewmodels
            _postViewModelList = new List<PostViewModel>();
            foreach (Post post in await _postCrudService.GetModelListAsync(culture,
                                                                         keyword: keyword,
                                                                         predicate: lambda))
            {
                _postViewModelList.Add(new PostViewModel
                {
                    Post = post,
                    Publisher = _UserManager.GetUsername(post.SubjectId)
                });
            }

            //Paginate
            int count = await _postCrudService.GetCountAsync(culture, lambda);
            IndexViewModel<PostViewModel> paginatedPosts = new IndexViewModel<PostViewModel>
            {
                PageViewModel = new PageViewModel(count, page, 15),
                ModelList = _postViewModelList
            };

            return View(new ForumViewModel
            {
                Posts = paginatedPosts,
                ForumTypeSelectList = forumTypeSelectList,
                SelectedCategory = fti
            });
        }

        public async Task<IActionResult> Create()
        {
            ForumViewModel fvm = new ForumViewModel();
            PostViewModel pvm = new PostViewModel();
            fvm.PostViewModel = pvm;

            Culture culture = HttpContext.GetCurrentCulture();
            fvm.ForumTypeSelectList = await _forumTypeService.GetSelectListAsync(culture);
            return View(fvm);
        }

        [HttpPost]
        public async Task<ActionResult> Create(ForumViewModel fvm)
        {
            PostViewModel pvm = fvm.PostViewModel;
            Post post = pvm.Post;
            post.PostType = Post.PostTypes.Forum;
            
            string imgError = ValidateImageList(fvm.FormImages);
            if (imgError != null)
            {
                ModelState.AddModelError("Image", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                Int32 UserId = HttpContext.GetCurrentUserId();
                post.UserId = UserId;
                await _postCrudService.AddAsync(post);

                if (fvm.FormImages != null)
                {
                    fvm.FormImages.Path = $"posts";
                    fvm.FormImages.Filename = post.ID.ToString();
                    UpdatePostImages(fvm.FormImages);
                }
                

                TempData["Action"] = "added";
                TempData["Status"] = "success";
                return RedirectToAction("Index");
            }
            else
            {
               Culture culture = HttpContext.GetCurrentCulture();
               fvm.ForumTypeSelectList = await _forumTypeService.GetSelectListAsync(culture);
               return View(pvm);
            }
        }
    }
}
