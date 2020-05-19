using HavhavAz.Models.ShelterModels;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using static HavhavAz.Helpers.Utilities;
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
using System.Threading.Tasks;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Helpers;

namespace HavhavAz.Controllers
{
    [Authorize]
    [Authorize(Policy="AdminConstraint")]
    public class ShelterController : Controller
    {
        private IList<ShelterViewModel> _shelterViewModelList;

        private ICRUDService<Shelter> _shelterCrudService;
        private ITranslateService<ShelterViewModel> _shelterTranslateService;

        private IUserManager<User> _UserManager;

        private readonly IStringLocalizer<ValidationMessages> _validationLocalizer;
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;

        public ShelterController(IServiceWrapper services,
                            IStringLocalizer<ValidationMessages> validationLocalizer,
                            IStringLocalizer<SharedResource> sharedLocalizer)
        {
            _validationLocalizer = validationLocalizer;
            _UserManager = services.UserManager;
            _shelterCrudService = services.ShelterCRUDService;
            _sharedLocalizer = sharedLocalizer;
            _shelterTranslateService = services.ShelterTranslateService;
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index(string username, int page = 1)
        {

            _shelterViewModelList = new List<ShelterViewModel>();
            Culture culture = HttpContext.GetCurrentCulture();

            int count = await _shelterCrudService.GetCountAsync(culture);
            foreach(Shelter shelter in await _shelterCrudService.GetModelListAsync(culture: culture,
                                                                                   page: page))
            {
                _shelterViewModelList.Add(await GenerateViewModel(shelter));
            }

            return View(new IndexViewModel<ShelterViewModel>
            {
                PageViewModel = new PageViewModel(count, page, 15),
                ModelList = _shelterViewModelList
            });
        }

      

        public ActionResult Create()
        {
            return View(new ShelterViewModel());
        }

        [HttpPost]
        public async Task<ActionResult> Create(ShelterViewModel svm)
        {
            return await AddOrUpdateAsync(svm);
        }

        

        
        public async Task<IActionResult> Edit(Int32 id)
        {
            Culture culture = HttpContext.GetCurrentCulture();
            Shelter shelter = await _shelterCrudService.GetModelByIdAsync(id, culture);
            return shelter == null ? (IActionResult) NotFound() : View(await GenerateViewModel(shelter));
        }

        [HttpPost]
        public async Task<ActionResult> Edit(Int32 id, ShelterViewModel svm)
        {
            return await AddOrUpdateAsync(svm, "edit");
        }

        [HttpPost]
        public async Task<ActionResult> Delete(Int32 id)
        {
            await _shelterCrudService.RemoveAsync(id);
            return Ok();
        }

        public async Task<ActionResult> Translate(Int32 si)
        {
            ShelterViewModel svm = new ShelterViewModel();
            svm.LanguageSelectList = GenerateLanguageSelectList(await _shelterTranslateService.GetCulturesListAsync(si));
            return View(svm);
        }

        [HttpPost]
        public async Task<ActionResult> Translate(ShelterViewModel svm)
        {
            int ShelterId = svm.Shelter.ID;
            //check if translated version is already existed
            if (await _shelterTranslateService.IsCultureExistedAsync(ShelterId, svm.ShelterTranslations.Culture))
            {
                ModelState.AddModelError("Culture", _validationLocalizer["CultureExists"]);
            }

            if (ModelState.IsValid)
            {
                await _shelterTranslateService.TranslateAsync(svm);

                TempData["Action"] = "translated";
                TempData["Status"] = "success";
                return RedirectToAction("Index");
            }
            else
            {
                IList<Culture> existedCultures = await _shelterTranslateService.GetCulturesListAsync(ShelterId);
                ViewBag.LanguageSelectList = GenerateLanguageSelectList(existedCultures);
                return View(svm);
            }
        }

        private async Task<ActionResult> AddOrUpdateAsync(ShelterViewModel svm, string action = "add")
        {
            string imgError = ValidateImage(svm.Image);
            if (imgError != null)
            {
                ModelState.AddModelError("Image", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                Culture culture = HttpContext.GetCurrentCulture();

                Shelter shelter = svm.Shelter;
                ShelterTranslations st = svm.ShelterTranslations;
                st.Culture = culture;
                shelter.ShelterTranslations.Add(st);

                ContactsViewModel cvm = svm.ContactsViewModel;
                Contacts contacts = cvm.Contacts;
                Address address = cvm.Address;
                address.Culture = culture;
                contacts.Addresses.Add(address);
                shelter.Contacts = contacts;
                
                if (action.Equals("add"))
                    await _shelterCrudService.AddAsync(shelter);
                else
                    await _shelterCrudService.UpdateAsync(shelter);

                UploadOneImage(svm.Image, "shelters", shelter.ID.ToString());

                TempData["Action"] = $"{action}ed";
                TempData["Status"] = "success";
                return RedirectToAction("Index");
            }
            else
            {
                return View(svm);
            }
        }

        private async Task<ShelterViewModel> GenerateViewModel(Shelter shelter)
        {
            ShelterTranslations st = shelter?.ShelterTranslations.FirstOrDefault();

            ContactsViewModel cvm = new ContactsViewModel()
            {
                Contacts = shelter.Contacts,
                Address = shelter.Contacts?.Addresses.FirstOrDefault(),
                ClassList = "li-block"
            };

            ShelterViewModel svm = new ShelterViewModel()
            {
                Shelter = shelter,
                ShelterTranslations = st,
                ContactsViewModel = cvm,
                IsUntranslated = await _shelterTranslateService.IsUntranslatedAsync(shelter.ID)
            };

            return svm;
        }

    }
}
