using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.MessageModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services
{
    public class MessageService : IMessageService
    {

        private ApplicationDbContext _db;

        public MessageService(ApplicationDbContext db,
                            IServiceWrapper services)
        {
            _db = db;
        }


        public void AddMessage(Message message)
        {
            throw new NotImplementedException();
        }

        public async Task AddMessageAsync(Message message)
        {
            await _db.Messages.AddAsync(message);
            await _db.SaveChangesAsync();
        }

        public int GetCount(int UserId, bool inbox = true)
        {
            return  _db.Messages
                        .AsNoTracking()
                        .Where(m => (inbox ? m.ReceiverId == UserId : m.SenderId == UserId) && m.IsSeen == false)
                        .Count();
        }

        public async Task<int> GetCountAsync(int UserId, bool inbox = true)
        {
            return await _db.Messages
                            .AsNoTracking()
                            .Where(m => (inbox ? m.ReceiverId == UserId : m.SenderId == UserId) && m.IsSeen == false)
                            .CountAsync();
        }

        public IList<Message> GetMessageList(int UserId, int page, bool inbox = true)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<Message>> GetMessageListAsync(int UserId, int page, bool inbox = true)
        {
            int pageElements = 15;
            var messages = await  _db.Messages
                                .AsNoTracking()
                                .Where(m=> (inbox ? m.ReceiverId == UserId : m.SenderId == UserId))
                                .Include(inbox ? "Sender" : "Receiver")
                                .OrderByDescending(m => m.Date)
                                .Skip((page - 1) * pageElements)
                                .Take(pageElements)
                                .ToListAsync();
            return messages;
        }

        public void MarkAsSeen(Int32 MessageId, Int32 ReceiverId)
        {
            throw new NotImplementedException();
        }

        public async Task MarkAsSeenAsync(Int32 MessageId, Int32 ReceiverId)
        {
            Message message = await _db.Messages.FindAsync(MessageId);

            if (message.ReceiverId != ReceiverId) throw new Exception("ReceiverId corrupted!");
            message.IsSeen = true;
            message.SeenDate = DateTime.Now.AddHours(11);
            await _db.SaveChangesAsync();
        }

    }
}
