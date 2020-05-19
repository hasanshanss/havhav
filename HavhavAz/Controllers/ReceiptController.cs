using HavhavAz.Helpers;
using HavhavAz.Helpers.Exceptions;
using HavhavAz.Hubs;
using HavhavAz.Models;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using HavhavAz.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;
using static HavhavAz.Models.UserModels.User;

namespace HavhavAz.Controllers
{
    [Authorize]
    public class ReceiptController : Controller
    {
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        private readonly IStringLocalizer<ValidationMessages> _validationLocalizer;
        private readonly IHubContext<NotificationHub> _notHubContext;

        private IReceiptService _receiptService;
        private IUserManager<User> _UserManager;
        private INotificationService _notificationService;
        private ICRUDService<Charity> _charityCrudService;

        public ReceiptController(IServiceWrapper services,
                                 IHubContext<NotificationHub> notHubContext,
                                 IStringLocalizer<SharedResource> sharedLocalizer,
                                 IStringLocalizer<ValidationMessages> validationLocalizer)
        {
            _UserManager = services.UserManager;
            _receiptService = services.ReceiptService;
            _notHubContext = notHubContext;
            _notificationService = services.NotificationService;
            _sharedLocalizer = sharedLocalizer;
            _validationLocalizer = validationLocalizer;
            _charityCrudService = services.CharityCRUDService;
        }

        [HttpPost]
        public async Task<ActionResult> ChangeState(Int32 ri, State state)
        {
            Int32 UserId = HttpContext.GetCurrentUserId();
            Roles role = HttpContext.GetCurrentUserRole();

            Int32 CharityId =  await _receiptService.GetCharityIdAsync(ri);

            if (role == Roles.Admin || await _charityCrudService.GetUserIdAsync(CharityId) == UserId)
            {
                return Ok(await _receiptService.ChangeStateAsync(ri, state));
            } else
            {
                throw new InvalidResultException("Access denied!");
            }
        }


        [HttpPost]
        public async Task<ActionResult> Delete(Int32 ri)
        {
            Int32 CharityId = await _receiptService.GetCharityIdAsync(ri);
            await _receiptService.RemoveByIdAsync(ri);
            DeleteMedia(ri.ToString(), $"charities/{CharityId}/receipts");
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> SendReceipt(ReceiptDTO receiptDTO)
        {
            Int32.TryParse(receiptDTO.CharityId, out Int32 CharityId);

            string imgError = ValidateImage(receiptDTO.Image);
            if (imgError != null)
            {
                ModelState.AddModelError("ImageError", _validationLocalizer[imgError]);
            }

            if (ModelState.IsValid)
            {
                Receipt receipt = new Receipt
                {
                    Name = receiptDTO.Name,
                    Amount = receiptDTO.Amount,
                    CharityId = CharityId
                };

                await _receiptService.AddReceiptAsync(receipt);
                UploadOneImage(receiptDTO.Image, $"charities/{receiptDTO.CharityId}/receipts", receipt.ID.ToString());
                Charity charity = await _receiptService.GetCharityAsync(CharityId);

                //send Notification
                Notification not = new Notification
                {
                    UserId = charity.UserId,
                    NotificationType = Notification.NotificationTypes.Receipt,
                    SubjectId = CharityId
                };

                await _notificationService.AddNotificationAsync(not);

                NotificationViewModel nvm = new NotificationViewModel
                {
                    Username = charity.Name,
                    NotificationType = "receipt",
                    Description = _sharedLocalizer[$"NotificationType.Receipt"],
                    Url = $"Charity/Index/{CharityId}"
                };

                await _notHubContext.Clients.User(charity.UserId.ToString()).SendAsync("Push", nvm);
            }

            return Ok();
        }

        [AllowAnonymous]
        public async Task<JsonResult> GetList(Int32 ci, byte state = 1)
        {
            IList<Receipt> receipts = null;
            Roles role = HttpContext.GetCurrentUserRole();
            Int32 UserId = HttpContext.GetCurrentUserId();

            Int32 CharityUserId = await _charityCrudService.GetUserIdAsync(ci);

            if (role == Roles.Admin || state < (CharityUserId == UserId ? 3 : 2) )
                receipts = await _receiptService.GetReceiptListAsync(ci, (State)state);

            return Json(new
            {
                receipts
            });
        }

    }
}
