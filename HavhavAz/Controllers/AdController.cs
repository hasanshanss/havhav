using HavhavAz.Models.AdModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using static HavhavAz.Helpers.Utilities;
using static HavhavAz.Models.UserModels.User;
using HavhavAz.Models.UserModels;
using HavhavAz.Models.PostModels;
using System.Security.Claims;
using Microsoft.Extensions.Localization;
using System.Linq.Expressions;
using HavhavAz.Models;
using HavhavAz.Validation;
using System.Data.Common;
using Microsoft.AspNetCore.Http;
using HavhavAz.Helpers.Extensions;
using HavhavAz.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq;
using HavhavAz.Helpers.Exceptions;
using HavhavAz.Helpers;

namespace HavhavAz.Controllers
{
    [Authorize]
    public class AdController : Controller
    {
        private IList<AdViewModel> _adViewModelList;

        private ICRUDService<Ad> _adCrudService;
        private IPostService _postService;

        private IUserManager<User> _UserManager;

        private readonly IStringLocalizer<ValidationMessages> _validationLocalizer;
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        private const Post.PostTypes postType = Post.PostTypes.Ad;

        public AdController(IServiceWrapper services,
                            IStringLocalizer<ValidationMessages> validationLocalizer,
                            IStringLocalizer<SharedResource> sharedLocalizer)
        {
            _validationLocalizer = validationLocalizer;
            _UserManager = services.UserManager;
            _postService = services.PostService;
            _adCrudService = services.AdCRUDService;
            _sharedLocalizer = sharedLocalizer;
        }

        [AllowAnonymous]
        [StateValidation]
        public async Task<IActionResult> Index(string username, 
                                               string keyword,
                                               Int32 ati,
                                               byte state = 1,
                                               int page = 1)
        {
            
            
            _adViewModelList = new List<AdViewModel>();

            //filter by query
            Expression<Func<Ad, bool>> lambda = null;

            if (ati != 0)
                lambda = m => m.AdType == (Ad.AdTypes) ati;
            else if (!String.IsNullOrEmpty(username))
                lambda = m => m.User.Username.Equals(username);

            Culture culture = HttpContext.GetCurrentCulture();
            foreach (Ad ad in await _adCrudService.GetModelListAsync(predicate: lambda,
                                                                      culture: culture,
                                                                      page: page,
                                                                      state: (State) state))
            {
                _adViewModelList.Add(new AdViewModel()
                {
                    Ad = ad,
                    PostCount = await _postService.GetCountAsync(postType, ad.ID, culture),
                    Publisher = await _UserManager.GetUsernameAsync(ad.UserId)
                });
            }

            int count = await _adCrudService.GetCountAsync(culture, lambda);
            return View(new IndexViewModel<AdViewModel>
            {
                PageViewModel = new PageViewModel(count, page, 15),
                ModelList = _adViewModelList,
            });
        }

        public async Task<ActionResult> Create()
        {
            return View(new AdViewModel() { AdTypes = GenerateAdTypeSelectList() });
        }

        [HttpPost]
        public async Task<ActionResult> Create(AdViewModel avm)
        {
            return await AddOrUpdateAsync(avm);
        }

        [Authorize(Policy ="AdminConstraint")]
        public async Task<ActionResult> Edit(Int32 id)
        {
            Ad ad = await _adCrudService.GetModelByIdAsync(id);

            if (ad == null)
            {
                return NotFound();
            }
            else
            {
                return View(new AdViewModel
                {
                    Ad = ad,
                    AdTypes = GenerateAdTypeSelectList()
                });
            }
        }

        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> Edit(AdViewModel avm)
        {
            return await AddOrUpdateAsync(avm, "edit");   
        }

        [HttpPost]
        public async Task<ActionResult> ChangeState(Int32 id, State state)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            Roles role = HttpContext.GetCurrentUserRole();

            //either role is Admin OR (state is user-accessible AND user is the author of post)
            if (role == Roles.Admin || (_userAccessibleStateList.Contains(state) && await _adCrudService.GetUserIdAsync(id) == UserId)) 
            {
                await _adCrudService.ChangeStateAsync(id, state);
            } else
            {
                throw new InvalidResultException("Access denied!");
            }

            return Ok();
        }

        [HttpPost]
        [Authorize(Policy="AdminConstraint")]
        public async Task<ActionResult> Delete(Int32 id)
        {
            await _adCrudService.RemoveAsync(id);
            return Ok();
        }

        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> DeleteAll(Int32[] id_list)
        {
            foreach (Int32 id in id_list)
            {
                await _adCrudService.RemoveAsync(id);
            }

            return Ok();
        }

        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> ApproveAll(Int32[] id_list)
        {
            foreach (Int32 id in id_list)
            {
            await _adCrudService.ChangeStateAsync(id, State.Approved);
            }

            return Ok();
        }

        private async Task<ActionResult> AddOrUpdateAsync(AdViewModel avm, string action = "add")
        {
            string imgError = ValidateImageList(avm.FormImages);
            if (imgError != null)
            {
                ModelState.AddModelError("ImageError", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                Int32 UserId = HttpContext.GetCurrentUserId();

                Ad ad = avm.Ad;
                ad.UserId = UserId;

                if (action.Equals("add"))
                    await _adCrudService.AddAsync(ad);
                else
                    await _adCrudService.UpdateAsync(ad);

                if (avm.FormImages != null)
                {
                    avm.FormImages.Path = $"ads";
                    avm.FormImages.Filename = ad.ID.ToString();
                    UpdatePostImages(avm.FormImages);
                }
                

                TempData["Action"] = $"{action}ed";
                TempData["Status"] = "success";

                return RedirectToAction("Index", new { ati = ad.AdType } );
            }
            else
            {
                avm.AdTypes = GenerateAdTypeSelectList();
                return View(avm);
            }
        }

        private List<SelectListItem> GenerateAdTypeSelectList()
        {
            return Enum.GetValues(typeof(Ad.AdTypes)).Cast<Ad.AdTypes>()
                                                  .Select(at =>
                    new SelectListItem
                    {
                        Value = ((byte)at).ToString(),
                        Text = _sharedLocalizer[$"Menu.Ad.{at.ToString()}"]
                    })
                    .ToList();
        }
    }
}
