using HavhavAz.Helpers;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.MessageModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;

namespace HavhavAz.Hubs
{
    public class ChatHub : Hub
    {
        private static int Count = 0;

        public ChatHub(IServiceWrapper services)
        {
            if (_cmpList == null)
            {
                _cmpList = new Queue<ChatMessagePublisher>();
            }
        }
        
        public override Task OnConnectedAsync()
        {
            Count++;
            base.OnConnectedAsync();
            Clients.All.SendAsync("updateCount", Count);
            return Task.CompletedTask;
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            Count--;
            base.OnDisconnectedAsync(exception);
            Clients.All.SendAsync("updateCount", Count);
            return Task.CompletedTask;
        }

        public async Task Send(string content)
        {
            if (String.IsNullOrEmpty(content.Trim()))
            {
                return;
            } else
            {
                var context = this.Context.GetHttpContext();

                //Send msg
                Int32 UserId = context.GetCurrentUserId();
                string Username = context.GetCurrentUsername();

                ChatMessagePublisher cmp = new ChatMessagePublisher
                {
                    Content = content,
                    Publisher = Username, 
                    ImagePath = GetMainPic("users", Username)
                };


                if (_cmpList.Count > 15)
                {
                    _cmpList.Dequeue();
                }

                _cmpList.Enqueue(cmp);

                await this.Clients.All.SendAsync("Send", cmp);
            }
            
        }
    }
}
