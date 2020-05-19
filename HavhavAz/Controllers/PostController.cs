using HavhavAz.Helpers;
using HavhavAz.Models;
using HavhavAz.Models.ForumModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;
using static HavhavAz.Models.UserModels.User;
using HavhavAz.Validation;
using Microsoft.Extensions.Localization;
using HavhavAz.Helpers.Extensions;
using HavhavAz.Filters;
using HavhavAz.Helpers.Exceptions;

namespace HavhavAz.Controllers
{
    [Authorize]
    public class PostController : Controller
    {
        private IList<PostViewModel> _postVieWModelList;

        private ICRUDService<Post> _postCrudService;
        private ITranslateService<PostTranslations> _postTranslateService;
        private ITypeService<ForumType> _forumTypeService;
        private IUserManager<User> _UserManager;
        private ICommentService _commentService;
        private IPostService _postService;

        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        private readonly IStringLocalizer<ValidationMessages> _validationLocalizer;

        public PostController(IServiceWrapper services,
                              IStringLocalizer<ValidationMessages> validationLocalizer,
                              IStringLocalizer<SharedResource> sharedLocalizer)
        {
            _commentService = services.CommentService;
            _postService = services.PostService;
            _postCrudService = services.PostCRUDService;
            _UserManager = services.UserManager;
            _forumTypeService = services.ForumTypeService;
            _validationLocalizer = validationLocalizer;
            _sharedLocalizer = sharedLocalizer;
            _postTranslateService = services.PostTranslateService;
        }

        [AllowAnonymous]
        [StateValidation]
        public async Task<IActionResult> Index(string id,
                                              Int32 si,
                                              string keyword,
                                              string ptn,
                                              byte state = 1,
                                              int page = 1)
        {
            Culture culture = HttpContext.GetCurrentCulture();
            Roles role = HttpContext.GetCurrentUserRole();

            //open single post
            if (!String.IsNullOrEmpty(id))
            {
                Post post = await _postCrudService.GetModelByIdAsync(ParseId(id), culture);
                if (post != null)
                {
                    await _postService.IncrementViewAsync(post.ID);
                }
                
                return (post!=null && (post.State == State.Approved || role == Roles.Admin))
                       ? View("Single", await GenerateViewModel(post, true))
                       : (IActionResult)NotFound();
            }
            else
            {
                _postVieWModelList = new List<PostViewModel>();
                Expression<Func<Post, bool>> lambda = null;

                if (!String.IsNullOrEmpty(ptn))
                {
                    Enum.TryParse(ptn, out Post.PostTypes postType);
                    lambda = m => m.PostType == postType;

                    //Check for subject
                    if (si != 0)
                    {
                        lambda = EFExtensions.AndAlso(lambda, m => m.SubjectId == si);
                        Int32 UserId = HttpContext.GetCurrentUserId();
                        Int32 SubjectUserId = _postService.GetSubjectUserId(postType, si);
                        ViewBag.IsMine = UserId == SubjectUserId;
                    }
                }

                //Generate ViewModels
                foreach (Post post in await _postCrudService.GetModelListAsync(culture: culture,
                                                                              keyword: keyword,
                                                                              predicate: lambda,
                                                                              page: page,
                                                                              state: (State)state))
                {
                    _postVieWModelList.Add(await GenerateViewModel(post));
                }

                //Paginate
                int count = await _postCrudService.GetCountAsync(culture, lambda);
                return View(new IndexViewModel<PostViewModel>
                {
                    PageViewModel = new PageViewModel(count, page, 15),
                    ModelList = _postVieWModelList
                });
            }
        }

        public async Task<IActionResult> Create(Int32 si, Post.PostTypes ptn = Post.PostTypes.News)
        {
            Roles role = HttpContext.GetCurrentUserRole();
            
            //Check for access
            if (role != Roles.Admin)
            {
                Int32 UserId = HttpContext.GetCurrentUserId();
                //if it's news or userId isn't matched, then redirect
                if (ptn == Post.PostTypes.News || UserId != await _postService.GetSubjectUserIdAsync(ptn, si))
                {
                    return RedirectToAction("Index", "Post", null);
                }
            }

            return View(new PostViewModel());
        }

        [HttpPost]
        public async Task<ActionResult> Create(PostViewModel pvm)
        {
            Post post = pvm.Post;

            Int32 UserId = HttpContext.GetCurrentUserId();
            Roles role = HttpContext.GetCurrentUserRole();
            Int32 SubjectUserId = _postService.GetSubjectUserId(post.PostType, post.SubjectId);
            bool isAdmin = role == Roles.Admin;
            bool isNews = post.PostType == Post.PostTypes.News;

            if (!isNews)
                pvm.PostTranslations.Culture = Culture.Neutral;

            //if it's news and role is not admin then redirect
            if (isNews && !isAdmin)
            {
                return RedirectToAction("Index", "Post", null);
            }

            //Check for attempt
            if ((UserId == SubjectUserId) || isAdmin)
            {
                post.UserId = UserId;
                return await AddOrUpdateAsync(pvm);
            }
            else
            {
                TempData["Action"] = "attempt";
                TempData["Status"] = "error";
                return RedirectToAction("Index");
            }

        }

        public async Task<ActionResult> Translate(Int32 pi)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            Roles role = HttpContext.GetCurrentUserRole();

            if (UserId != await _postCrudService.GetUserIdAsync(pi) && role != Roles.Admin)
            {
                return RedirectToAction("Index");
            }

            ViewBag.LanguageSelectList = GenerateLanguageSelectList(await _postTranslateService.GetCulturesListAsync(pi));
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Translate(PostTranslations pt)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            Roles role = HttpContext.GetCurrentUserRole();

            if (UserId != await _postCrudService.GetUserIdAsync(pt.PostId) && role != Roles.Admin)
            {
                TempData["Action"] = "attempt";
                TempData["Status"] = "error";
                return RedirectToAction("Index");
            }

            //check if translated version is already existed
            if (await _postTranslateService.IsCultureExistedAsync(pt.PostId, pt.Culture))
            {
                ModelState.AddModelError("Culture", _validationLocalizer["CultureExists"]);
            }

            if (ModelState.IsValid)
            {
                await _postTranslateService.TranslateAsync(pt);

                TempData["Action"] = "translated";
                TempData["Status"] = "success";
                return RedirectToAction("Index");
            }
            else
            {
                IList<Culture> existedCultures = await _postTranslateService.GetCulturesListAsync(pt.PostId);
                ViewBag.LanguageSelectList = GenerateLanguageSelectList(existedCultures);
                return View(pt);
            }
        }

        [Authorize(Policy="AdminConstraint")]
        public async Task<ActionResult> Edit(Int32 id)
        {
            IList<Culture> cultures = await _postTranslateService.GetCulturesListAsync(id);
            Post post = await _postCrudService.GetModelByIdAsync(id, cultures.First());
            
            if (post == null)
            {
                return NotFound();
            } else
            {
                return View(new PostViewModel
                {
                    Post = post,
                    PostTranslations = post.PostTranslations.First(),
                    ExistedCultures = cultures
                });
            }
        }

        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> Edit(PostViewModel pvm)
        {
            return await AddOrUpdateAsync(pvm, "edit");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<CommentViewModel> ShowMoreComments(Int32 PostId, int skip)
        {
            return await _commentService.GetCommentListAsync(PostId, skip);
        }

        [HttpPost]
        [Authorize(Policy="AdminConstraint")]
        public async Task<ActionResult> Delete(Int32 id)
        {
            await _postCrudService.RemoveAsync(id);
            return Ok(new { redirect = "/Post" });
        }

        [HttpPost]
        public async Task<ActionResult> RemoveComment(Int32 comment_id)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            Roles role = HttpContext.GetCurrentUserRole();
            bool isAdmin = role == Roles.Admin;

            if (isAdmin || UserId == await _commentService.GetUserIdAsync(comment_id))
            {
                await _commentService.RemoveCommentAsync(comment_id);
            }
            return Ok();
        }

        private async Task<PostViewModel> GenerateViewModel(Post post, bool withComments = false)
        {
            PostViewModel pvm = new PostViewModel
            {
                Post = post,
                Publisher = await _UserManager.GetUsernameAsync(post.UserId),
                IsUntranslated = await _postTranslateService.IsUntranslatedAsync(post.ID)
            };

            if (withComments)
            {
                pvm.CommentViewModel = await _commentService.GetCommentListAsync(post.ID, 0);

            }

            return pvm;
        }

        [HttpPost]
        public async Task<ActionResult> ChangeState(Int32 id, State state)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            Roles role = HttpContext.GetCurrentUserRole();

            //either role is Admin OR (state is user-accessible AND user is the author of post)
            if (role == Roles.Admin || (_userAccessibleStateList.Contains(state) && await _postCrudService.GetUserIdAsync(id) == UserId))
            {
                await _postCrudService.ChangeStateAsync(id, state);
            }
            else
            {
                throw new InvalidResultException("Access denied!");
            }

            return Ok(new { redirect = "/Post" });
        }


        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> DeleteAll(Int32[] id_list)
        {
            
            foreach (Int32 id in id_list)
            {
                await _postCrudService.RemoveAsync(id);
            }

            return Ok();

        }

        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> ApproveAll(Int32[] id_list)
        {

            foreach (Int32 id in id_list)
            {
                await _postCrudService.ChangeStateAsync(id, State.Approved);
            }

            //redirect
            return Ok();
        }

        private async Task<ActionResult> AddOrUpdateAsync(PostViewModel pvm, string action = "add")
        {
            Post post = pvm.Post;

            string imgError = ValidateImageList(pvm.FormImages);
            if (imgError != null)
            {
                ModelState.AddModelError("FormImages", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                post.PostTranslations.Add(pvm.PostTranslations);

                if (action.Equals("add"))
                    await _postCrudService.AddAsync(post);
                else
                    await _postCrudService.UpdateAsync(post);

                if (pvm.FormImages != null)
                {
                    pvm.FormImages.Path = $"posts";
                    pvm.FormImages.Filename = post.ID.ToString();
                    UpdatePostImages(pvm.FormImages);
                }
                

                TempData["Action"] = $"{action}ed";
                TempData["Status"] = "success";
                return RedirectToAction("Index", new { ptn = post.PostType.ToString(), si = post.SubjectId.ToString() });

            }
            else
            {
                return View(pvm);
            }
        }
    }
}
