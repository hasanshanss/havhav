using HavhavAz.Models.NotificationModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Hubs
{
    public class NotificationHub : Hub
    {

        //private INotificationService _notificationService;
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;

        public NotificationHub(IServiceWrapper services,
                               IStringLocalizer<SharedResource> sharedLocalizer)
        {
            _sharedLocalizer = sharedLocalizer;
            //_notificationService = services.NotificationService;
        }

        //public async Task MarkAsViewed(string NotId)
        //{
        //    await _notificationService.MarkAsViewedAsync(Int32.Parse(NotId));
        //}
    }
}
