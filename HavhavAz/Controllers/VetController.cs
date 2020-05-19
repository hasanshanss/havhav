using HavhavAz.Models.VetModels;
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
    [Authorize(Policy="AdminConstraint")]
    public class VetController : Controller
    {
        private IList<VetViewModel> _vetViewModelList;

        private ICRUDService<Vet> _vetCrudService;
        private ITranslateService<VetViewModel> _vetTranslateService;

        private IUserManager<User> _UserManager;

        private readonly IStringLocalizer<ValidationMessages> _validationLocalizer;
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;

        public VetController(IServiceWrapper services,
                            IStringLocalizer<ValidationMessages> validationLocalizer,
                            IStringLocalizer<SharedResource> sharedLocalizer)
        {
            _validationLocalizer = validationLocalizer;
            _UserManager = services.UserManager;
            _vetCrudService = services.VetCRUDService;
            _sharedLocalizer = sharedLocalizer;
            _vetTranslateService = services.VetTranslateService;
        }


        [AllowAnonymous]
        public async Task<IActionResult> Index(string username, int page = 1)
        {

            _vetViewModelList = new List<VetViewModel>();
            Culture culture = HttpContext.GetCurrentCulture();

            int count = await _vetCrudService.GetCountAsync(culture);
            foreach (Vet vet in await _vetCrudService.GetModelListAsync(culture: culture,
                                                                        page: page))
            {
                _vetViewModelList.Add(await GenerateViewModel(vet));
            }

            return View(new IndexViewModel<VetViewModel>
            {
                PageViewModel = new PageViewModel(count, page, 15),
                ModelList = _vetViewModelList
            });
        }

        
        public ActionResult Create()
        {
            return View(new VetViewModel());
        }

        [HttpPost]
        public async Task<ActionResult> Create(VetViewModel svm)
        {
            return await AddOrUpdateAsync(svm);
        }




        public async Task<IActionResult> Edit(Int32 id)
        {
            Culture culture = HttpContext.GetCurrentCulture();

            Vet vet = await _vetCrudService.GetModelByIdAsync(id, culture);
            return vet == null ? (IActionResult)NotFound() : View(await GenerateViewModel(vet));
            
        }

        public async Task<ActionResult> Translate(Int32 vi)
        {
            VetViewModel vvm = new VetViewModel();
            vvm.LanguageSelectList = GenerateLanguageSelectList(await _vetTranslateService.GetCulturesListAsync(vi));
            return View(vvm);
        }

        [HttpPost]
        public async Task<ActionResult> Translate(VetViewModel vvm)
        {
            int VetId = vvm.Vet.ID;
            //check if translated version is already existed
            if (await _vetTranslateService.IsCultureExistedAsync(VetId, vvm.VetTranslations.Culture))
            {
                ModelState.AddModelError("Culture", _validationLocalizer["CultureExists"]);
            }

            if (ModelState.IsValid)
            {
                await _vetTranslateService.TranslateAsync(vvm);

                TempData["Action"] = "translated";
                TempData["Status"] = "success";
                return RedirectToAction("Index");
            }
            else
            {
                IList<Culture> existedCultures = await _vetTranslateService.GetCulturesListAsync(VetId);
                ViewBag.LanguageSelectList = GenerateLanguageSelectList(existedCultures);
                return View(vvm);
            }
        }


        [HttpPost]
        public async Task<ActionResult> Edit(Int32 id, VetViewModel svm)
        {
            return await AddOrUpdateAsync(svm, "edit");
        }

        [HttpPost]
        public async Task<ActionResult> Delete(Int32 id)
        {
            await _vetCrudService.RemoveAsync(id);
            return Ok();
        }

        private async Task<ActionResult> AddOrUpdateAsync(VetViewModel svm, string action = "add")
        {
            string imgError = ValidateImage(svm.Image);
            if (imgError != null)
            {
                ModelState.AddModelError("Image", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                Culture culture = HttpContext.GetCurrentCulture();

                Vet vet = svm.Vet;
                VetTranslations vt = svm.VetTranslations;
                vt.Culture = culture;
                vet.VetTranslations.Add(vt);

                ContactsViewModel cvm = svm.ContactsViewModel;
                Contacts contacts = cvm.Contacts;
                Address address = cvm.Address;
                address.Culture = culture;
                contacts.Addresses.Add(address);
                vet.Contacts = contacts;

                if (action.Equals("add"))
                    await _vetCrudService.AddAsync(vet);
                else
                    await _vetCrudService.UpdateAsync(vet);

                UploadOneImage(svm.Image, "vets", vet.ID.ToString());

                TempData["Action"] = $"{action}ed";
                TempData["Status"] = "success";
                return RedirectToAction("Index");
            }
            else
            {
                return View(svm);
            }
        }

        private async Task<VetViewModel> GenerateViewModel(Vet vet)
        {
            VetTranslations vt = vet?.VetTranslations.FirstOrDefault();

            ContactsViewModel cvm = new ContactsViewModel()
            {
                Contacts = vet.Contacts,
                Address = vet.Contacts?.Addresses.FirstOrDefault(),
                ClassList = "li-block"
            };

            VetViewModel vvm = new VetViewModel()
            {
                Vet = vet,
                VetTranslations= vt,
                ContactsViewModel = cvm,
                IsUntranslated = await _vetTranslateService.IsUntranslatedAsync(vet.ID)
            };

            return vvm;
        }

    }
}
