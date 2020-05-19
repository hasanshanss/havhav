using HavhavAz.Helpers.HtmlHelpers;
using HavhavAz.Models;
using HavhavAz.Models.AdModels;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.ForumModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Extensions.Logging;
using HavhavAz.Helpers.Exceptions;
using HavhavAz.Helpers;
using System.Threading;

namespace HavhavAz.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IUserManager<User> _UserManager;

        public HomeController(IServiceWrapper services, 
                              ILogger<HomeController> logger)
        {
            _UserManager = services.UserManager;
            _logger = logger;
        }

     
        public IActionResult SetLanguage(string culture, string returnUrl)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return Redirect(returnUrl);
        }

        public ActionResult Chat()
        {
            
            return View();
        }

        public ActionResult Index()
        {
            
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        [Route("error/{statusCode}")]
        public IActionResult Error(string statusCode)
        {
            return View("Error", statusCode);
        }

        [Route("error")]
        public IActionResult InternalError()
        {
            var exceptionDetails = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            Exception ex = exceptionDetails.Error;

            _logger.LogError($"The path {exceptionDetails.Path} threw an exception " + $" {ex}");
            
            if (HttpContext.Request.IsAjaxRequest())
            {
                string errorMessage = (ex is InvalidResultException) ? ex.Message : String.Empty;
                return BadRequest(errorMessage);
            } else
            {
                return View("Error", HttpContext.Response.StatusCode.ToString());
            }
        }


        [HttpPost]
        public string LoadGalleryAjax(string path)
        {
            return HelperMethods.ListImagesAjax(path);
        }

    }
}