using HavhavAz.Models.MessageModels;
using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface IMessageService
    {
        IList<Message> GetMessageList(Int32 UserId, int skip, bool inbox = true);
        Task<IList<Message>> GetMessageListAsync(Int32 UserId, int skip, bool inbox = true);

        void AddMessage(Message message);
        Task AddMessageAsync(Message message);

        int GetCount(Int32 UserId, bool inbox);
        Task<int> GetCountAsync(Int32 UserId, bool inbox);

        void MarkAsSeen(Int32 MessageId, Int32 ReceiverId);
        Task MarkAsSeenAsync(Int32 MessageId, Int32 ReceiverId);
    }
}
