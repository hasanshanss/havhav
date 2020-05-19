using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using HavhavAz.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using static HavhavAz.Helpers.Utilities;
using HavhavAz.Models;
using HavhavAz.Models.MessageModels;
using Microsoft.AspNetCore.SignalR;
using HavhavAz.Hubs;
using HavhavAz.Models.ContactsModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text;
using HavhavAz.Models.CaptchaModels;
using Microsoft.Extensions.Logging;
using HavhavAz.Filters.LogFilters;
using HavhavAz.Helpers.Exceptions;
using HavhavAz.Helpers;
using System.Threading;
using HavhavAz.Services.LoggerService;

namespace HavhavAz.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly IUserManager<User> _UserManager;
        private readonly IMessageService _messageService;
        private readonly INotificationService _notificationService;
        private readonly GoogleCaptchaService _googleCaptchaService;

        private readonly IHubContext<NotificationHub> _notHubContext;
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        private readonly IStringLocalizer<ValidationMessages> _validationLocalizer;

        public AccountController(IServiceWrapper services,
                                 IStringLocalizer<ValidationMessages> validationLocalizer,
                                 IStringLocalizer<SharedResource> sharedLocalizer,
                                 IHubContext<NotificationHub> notHubContext,
                                 GoogleCaptchaService googleCaptchaService,
                                 ILogger<AccountController> logger)
        {
            _validationLocalizer = validationLocalizer;
            _sharedLocalizer = sharedLocalizer;
            _UserManager = services.UserManager;
            _messageService = services.MessageService;
            _notificationService = services.NotificationService;
            _notHubContext = notHubContext;
            _googleCaptchaService = googleCaptchaService;
        }

        

        [HttpGet]
        public async Task<IActionResult> Messages(int page = 1,
                                                  bool inbox = true)
        {
            
            Int32 UserId = HttpContext.GetCurrentUserId();
            IList<Message> messageList = await _messageService.GetMessageListAsync(UserId, page, inbox);

            int count = await _messageService.GetCountAsync(UserId, inbox);
            return View(new IndexViewModel<Message>
            {
                PageViewModel = new PageViewModel(count, page, 15),
                ModelList = messageList
            });
        }

        [Route("/Account/Messages/MarkAsSeen")]
        [HttpPost]
        public async Task<ActionResult> MarkMsgAsSeen(int messageId)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            await _messageService.MarkAsSeenAsync(messageId, UserId);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(int ReceiverId, string Message)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();

            Message msg = new Message(Message) { SenderId = UserId, ReceiverId = ReceiverId };
            await _messageService.AddMessageAsync(msg);

            if (!String.IsNullOrWhiteSpace(Message))
            {
                string Name = HttpContext.GetCurrentUserName();

                NotificationViewModel nvm = new NotificationViewModel
                {
                    Username = Name,
                    NotificationType = "message",
                    Description = _sharedLocalizer["NotificationType.Message"],
                    Url = "/Account/Messages/"
                };

                await _notHubContext.Clients.User(ReceiverId.ToString()).SendAsync("Push", nvm);
            }

            return Ok();
        }


        public async Task<IActionResult> Notifications()
        {
            return View(await GenerateNotViewModelListAsync(0));
        }

        [HttpPost]
        public async Task<ActionResult> DeleteNotifications()
        {
            await _notificationService.DeleteNotificationsAsync(HttpContext.GetCurrentUserId());
            return Ok();
        }

        [HttpPost]
        public async Task<IList<NotificationViewModel>> LoadNotificationsOnScroll(int skip)
        {
            return await GenerateNotViewModelListAsync(skip);
        }



        [HttpGet]
        public async Task<IActionResult> Edit()
        {
            User user = await _UserManager.GetUserByIdAsync(HttpContext.GetCurrentUserId());

            return View(new UserEditModel
            {
                BirthDate = user.BirthDate,
                DOB_Hide = user.DOB_Hide,
                Info = user.Info,
                ContactsViewModel = new ContactsViewModel
                {
                    NotDisplay = new string[] {"address"},
                    Contacts = user.Contacts
                }
            });
        }

        [HttpPost]
        public async Task<IActionResult> Edit(UserEditModel uem)
        {
            string imgError = ValidateImage(uem.Image);
            if (imgError != null)
            {
                ModelState.AddModelError("Image", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                User EditedUser = new User
                {
                    ID = HttpContext.GetCurrentUserId(),
                    Contacts = uem.ContactsViewModel.Contacts,
                    DOB_Hide = uem.DOB_Hide,
                    Info = uem.Info,
                    BirthDate = uem.BirthDate
                };

                await _UserManager.AddOrUpdateAsync(EditedUser);
                UploadOneImage(uem.Image, "users", HttpContext.GetCurrentUsername());

                TempData["Action"] = "edited";
                TempData["Status"] = "success";
                return RedirectToAction("Index");
            }

            return View(uem);
        }


        [Route("/Security")]
        [HttpGet]
        public async Task<IActionResult> ChangeSecurityInfo()
        {
            User user = await _UserManager.GetUserByIdAsync(HttpContext.GetCurrentUserId());
            return View("ChangeSecurityInfo", user.Email);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeSecurityInfo(string op,
                                                        string subject,
                                                        string data)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            string ErrorMessage = String.Empty;

            //Check for old password
            if (!await _UserManager.CheckOldPasswordAsync(UserId, op))
            {
                ErrorMessage = _validationLocalizer["InvalidOldPassword"];
            } else
            {
                if (subject.Equals("password"))
                {
                    //Check for difference of new password
                    if (await _UserManager.CheckOldPasswordAsync(UserId, data))
                    {
                        ErrorMessage = _validationLocalizer["PasswordSame"];
                    }
                    else
                    {
                        await _UserManager.ChangePasswordAsync(UserId, data);
                        User user = await _UserManager.GetUserByIdAsync(UserId);
                        Task.Run(() => SendEmail(user.Email, 
                                    user.Name, 
                                    _sharedLocalizer["ChangePassword"], 
                                    _sharedLocalizer["Security.PasswordChanged"]));
                    }

                }
                else if (subject.Equals("email"))
                {
                    await _UserManager.ChangeEmailAsync(UserId, data);
                    User user = await _UserManager.GetUserByIdAsync(UserId);
                    SendEmail(user.Email, 
                                user.Name, 
                                _sharedLocalizer["Security"], 
                                _sharedLocalizer["Security.EmailChanged"]);
                }
            }

            if (!String.IsNullOrEmpty(ErrorMessage))
                throw new InvalidResultException(ErrorMessage);
            else
                return Ok();
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index(string id, string keyword, int page = 1)
        {
            if (!String.IsNullOrEmpty(keyword))
            {
                //Paginate
                int count = await _UserManager.GetCountAsync(m=>m.Name.Contains(keyword) || m.Username.Contains(keyword) || m.Info.Contains(keyword));
                IndexViewModel<User> ivm = new IndexViewModel<User>
                {
                    PageViewModel = new PageViewModel(count, page, 15),
                    ModelList = await _UserManager.GetListByKeywordAsync(keyword)
                };
                ViewBag.Url = "/User/Index";
                ViewBag.Title = _sharedLocalizer["Titles.SearchResults"];
                return View("~/Views/Account/UserList.cshtml", ivm);
            }
            else
            {
                User user = await _UserManager.GetUserByUsernameAsync(id ?? HttpContext.GetCurrentUsername());
                return user == null ? (IActionResult) NotFound() : View(user);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Register()
        {
            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Index");

            return View(new RegisterViewModel());
        }


        [AllowAnonymous]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel rvm)
        {

            var _googleCaptcha = _googleCaptchaService.VerifyToken(rvm.CaptchaToken);

            if(_googleCaptcha.Result.Success && _googleCaptcha.Result.Score <= 0.5)
            {
                ModelState.AddModelError("CaptchaToken", _validationLocalizer["InvalidCaptcha"]);
            }

            string imgError = ValidateImage(rvm.Image);
            if (imgError != null)
            {
                ModelState.AddModelError("Image", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                if (!await _UserManager.IsUserExistedAsync(rvm.Username))
                {
                    User RegisteredUser = new User
                    {
                        Username = rvm.Username,
                        Info = rvm.Info,
                        Password = rvm.Password,
                        Name = rvm.Name,
                        BirthDate = rvm.BirthDate,
                        Email = rvm.Email,
                        Gender = rvm.Gender,
                        Contacts = rvm.ContactsViewModel.Contacts
                    };

                    await _UserManager.AddOrUpdateAsync(RegisteredUser);
                    UploadOneImage(rvm.Image, "users", RegisteredUser.Username.ToString());

                    await Authenticate(RegisteredUser, true);

                    TempData["Action"] = "registered";
                    TempData["Status"] = "success";
                    return RedirectToAction("Index", "Account");
                }
                else
                {
                    ModelState.AddModelError("Username", _validationLocalizer["UsernameExisted"]);
                }
            }

            
            return View(rvm);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Login()
        {
            if (User.Identity.IsAuthenticated)
                return NotFound();

            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        [LogAfter(LogActionInfo.LogAction.Login)]
        public async Task<IActionResult> Login(LoginViewModel lvm)
        {
            if (ModelState.IsValid)
            {
                User user = await _UserManager.GetUserForLoginAsync(lvm.Username, lvm.Password);
                if (user != null)
                {
                    await Authenticate(user, lvm.RememberMe);
                    

                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("Password", _validationLocalizer["UsernameOrPasswordIsNotCorrect"]);
            }
            return View(lvm);
        }

        [LogBefore(LogActionInfo.LogAction.Logout)]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Redirect("/Home/Index");
        }

        [AllowAnonymous]
        [HttpPost]
        
        public async Task<ActionResult> ForgetPassword(string Username)
        {
            User user = await _UserManager.GetUserByUsernameAsync(Username);

            if (user == null)
            {
                throw new InvalidResultException(_validationLocalizer["UserNotFound"]);
            }
            else
            {
                string ResetPasswordCode = await _UserManager.UpdateResetPasswordCodeAsync(user);
                string body = _sharedLocalizer["PasswordReset.MailMessage", user.Name, ResetPasswordCode, Username];
                Task.Run(() => SendEmail(user.Email, user.Name, _sharedLocalizer["ChangePassword"], body)); 
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> ResetPassword(string rpc, string username)
        {
            User user = await _UserManager.GetUserByUsernameAsync(username);

            if (user == null || !user.ResetPasswordCode.Equals(rpc) || DateTime.Now.AddHours(11).Subtract(user.ResetPasswordDate).Days > 0)
            {
                return NotFound();
            } else
            {
                return View(new ResetPasswordViewModel
                {
                    ResetPasswordCode = rpc,
                    Username = username
                });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [LogAfter(LogActionInfo.LogAction.ResetPassword)]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel rpvm)
        {
            
            string ErrorMessage = String.Empty;
            User user;

            if (!ModelState.IsValid) 
            {
                StringBuilder errors = new StringBuilder();

                foreach (var modelState in ModelState.Values)
                {
                    foreach (ModelError error in modelState.Errors)
                    {
                        errors.Append(error + "\n");
                    }
                }

                ErrorMessage = errors.ToString();
            }

            //check ModelState
            else if ((user = await _UserManager.GetUserByUsernameAsync(rpvm.Username)) == null)
            {
                ErrorMessage = _validationLocalizer["UserNotFound"];
            }

            //check for rpc
            else if (!user.ResetPasswordCode.Equals(rpvm.ResetPasswordCode) || DateTime.Now.AddHours(11).Subtract(user.ResetPasswordDate).Days > 0)
            {
               ErrorMessage = _validationLocalizer["PasswordReset.LinkExpired"];
            }

            //Check for difference of new password
            else if (await _UserManager.CheckOldPasswordAsync(user.ID, rpvm.Password))
            {
                ErrorMessage = _validationLocalizer["PasswordSame"];
            }
            else
            { 
                await _UserManager.ChangePasswordAsync(user.ID, rpvm.Password);
                Task.Run(() => SendEmail(user.Email,
                            user.Name,
                            _sharedLocalizer["ChangePassword"],
                            _sharedLocalizer["Security.PasswordChanged"]));
            }

            if (!String.IsNullOrEmpty(ErrorMessage))
            {
                throw new InvalidResultException(ErrorMessage);
            } else
            {
                return Ok(new { redirect = "/Login" });
            }
        }

        private async Task Authenticate(User user, bool isRemember)
        {
            var claims = new List<Claim>
            {
                new Claim("UserId", user.ID.ToString()),
                new Claim("Username", user.Username),
                new Claim("Name", user.Name),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString())
            };

            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                                      new ClaimsPrincipal(id),
                                      new AuthenticationProperties
                                      {
                                          IsPersistent = isRemember
                                      });
        }



        private async Task<IList<NotificationViewModel>> GenerateNotViewModelListAsync(Int32 skip)
        {

            IList<NotificationViewModel> _nvmList = new List<NotificationViewModel>();
            Int32 UserId = HttpContext.GetCurrentUserId();
            Culture culture = HttpContext.GetCurrentCulture();

            foreach (Notification not in await _notificationService.GetNotificationListAsync(UserId, skip))
            {
                NotificationViewModel nvm = new NotificationViewModel { Not = not };

                string Username = await _UserManager.GetUsernameAsync(not.AuthorId);
                string SubjectName = await _notificationService.GetSubjectNameAsync(not.NotificationType, not.SubjectId, culture);
                string Description = _sharedLocalizer[$"NotificationType.{not.NotificationType.ToString()}"].Value;

                switch (not.NotificationType)
                {
                    case Notification.NotificationTypes.Comment:
                        {
                            nvm.Icon = "far fa-comment";
                            nvm.NotText = $"<a href='/Account/Index/{Username}' class='no-style orange clickable'>{Username} </a></script> {Description}: " +
                                          $"<a href='/Post/Index/{Slugify(SubjectName)}_{not.SubjectId}' class='no-style orange clickable'>{SubjectName}</a>";
                            break;
                        }
                    case Notification.NotificationTypes.Receipt:
                        {
                            nvm.Icon = "fas fa-hand-holding-usd";
                            nvm.NotText = $"<a href='/Charity/Index/{not.SubjectId}' class='no-style orange clickable'>{SubjectName}</a> {Description}!";
                            break;
                        }

                }

                _nvmList.Add(nvm);
            }

            return _nvmList;
        }
    }
}
