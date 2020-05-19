using HavhavAz.Filters;
using HavhavAz.Models;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using static HavhavAz.Models.UserModels.User;
using HavhavAz.Services.Interfaces;
using HavhavAz.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;
using HavhavAz.Helpers.Exceptions;
using HavhavAz.Helpers;

namespace HavhavAz.Controllers
{
    [Authorize]
    public class CharityController : Controller
    {
        private IList<CharityViewModel> _charityViewModelList;

        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        private readonly IStringLocalizer<ValidationMessages> _validationLocalizer;

        private ICRUDService<Charity> _charityCrudService;
        private IPostService _postService;
        private IUserManager<User> _UserManager;

        private const Post.PostTypes postType = Post.PostTypes.Charity;

        public CharityController(IServiceWrapper services,
                                 IStringLocalizer<SharedResource> sharedLocalizer,
                                 IStringLocalizer<ValidationMessages> validationLocalizer)
        {
            _charityCrudService = services.CharityCRUDService;
            _UserManager = services.UserManager;
            _postService = services.PostService;
            _sharedLocalizer = sharedLocalizer;
            _validationLocalizer = validationLocalizer;
        }

        [AllowAnonymous]
        [StateValidation]
        public async Task<IActionResult> Index(Int32 id,
                                                string keyword,
                                                string username,
                                                byte state = 1,
                                                int page = 1)
        {
            _charityViewModelList = new List<CharityViewModel>();
            Culture culture = HttpContext.GetCurrentCulture();

            //filter by query
            Expression<Func<Charity, bool>> lambda = null;

            if (id != 0)
                lambda = m => m.ID == id;
            else if (!String.IsNullOrEmpty(username))
                lambda = m => m.User.Username.Equals(username);

            
            foreach (Charity charity in await _charityCrudService.GetModelListAsync(predicate: lambda,
                                                                                    culture: culture,
                                                                                    page: page,
                                                                                    state: (State) state))
            {
                _charityViewModelList.Add(new CharityViewModel()
                {
                    Charity = charity,
                    PostCount = await _postService.GetCountAsync(postType, charity.ID, culture),
                    Publisher = await _UserManager.GetUsernameAsync(charity.UserId),
                });
            }

            int count = await _charityCrudService.GetCountAsync(culture, lambda);
            return View(new IndexViewModel<CharityViewModel>
            {
                PageViewModel = new PageViewModel(count, page, 15),
                ModelList = _charityViewModelList
            });
        }

        // GET: Charity/Create
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(CharityViewModel cvm)
        {
            return await AddOrUpdateAsync(cvm);
        }

        [Authorize(Policy="AdminConstraint")]
        public async Task<ActionResult> Edit(Int32 id)
        {
            Charity charity = await _charityCrudService.GetModelByIdAsync(id);

            if (charity == null)
            {
                return NotFound();
            }
            else
            {
                return View(new CharityViewModel
                {
                    Charity = charity
                });
            }

            
        }

        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> Edit(CharityViewModel cvm)
        {
            return await AddOrUpdateAsync(cvm, "edit");
        }

        

        [HttpPost]
        public async Task<ActionResult> ChangeState(Int32 id, State state)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            Roles role = HttpContext.GetCurrentUserRole();

            //either role is Admin OR (state is user-accessible AND user is the author of post)
            if (role == Roles.Admin || (_userAccessibleStateList.Contains(state) && await _charityCrudService.GetUserIdAsync(id) == UserId))
            {
                await _charityCrudService.ChangeStateAsync(id, state);
            }
            else
            {
                throw new InvalidResultException("Access denied!");
            }
            

            return Ok();
        }

        [HttpPost]
        [Authorize(Policy="AdminConstraint")]
        public async Task<ActionResult> Delete(Int32 id)
        {
            await _charityCrudService.RemoveAsync(id);
            return Ok();
        }


        
        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> DeleteAll(Int32[] id_list)
        {
            foreach(Int32 id in id_list)
            {
                await _charityCrudService.RemoveAsync(id);
            }

            return Ok();
        }


        [Authorize(Policy="AdminConstraint")]
        [HttpPost]
        public async Task<ActionResult> ApproveAll(Int32[] id_list)
        {
            foreach (Int32 id in id_list)
            {
                await _charityCrudService.ChangeStateAsync(id, State.Approved);
            }

            return Ok();
        }


        private async Task<ActionResult> AddOrUpdateAsync(CharityViewModel cvm, string action = "add")
        {
            string imgError = ValidateImageList(cvm.FormImages);
            if (imgError != null)
            {
                ModelState.AddModelError("FormImages", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                Int32 UserId = HttpContext.GetCurrentUserId();

                Charity charity = cvm.Charity;
                charity.UserId = UserId;

                if (action.Equals("add"))
                    await _charityCrudService.AddAsync(charity);
                else
                    await _charityCrudService.UpdateAsync(charity);

                if (cvm.FormImages != null)
                {
                    cvm.FormImages.Path = $"charities";
                    cvm.FormImages.Filename = charity.ID.ToString();
                    UpdatePostImages(cvm.FormImages);
                }
                

                TempData["Action"] = $"{action}ed";
                TempData["Status"] = "success";
                return RedirectToAction("Index");
            }
            else
            {
                return View(cvm);
            }
        }

    }
}
