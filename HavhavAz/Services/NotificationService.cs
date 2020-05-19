using HavhavAz.Data;
using HavhavAz.Hubs;
using HavhavAz.Models;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HavhavAz.Services
{
    public class NotificationService : INotificationService
    {

        private ApplicationDbContext _db;
        private IList<Notification> _notificationList;
        public NotificationService(ApplicationDbContext db,
                            IServiceWrapper services)
        {
            _db = db;
        }

        public void AddNotification(Notification notification)
        {
            throw new NotImplementedException();
        }

        public async Task AddNotificationAsync(Notification notification)
        {
            await _db.Notifications.AddAsync(notification);
            await _db.SaveChangesAsync();
        }

        public void DeleteNotifications(int UserId)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteNotificationsAsync(int UserId)
        {
            _db.Notifications.RemoveRange(await _db.Notifications.Where(m => m.UserId == UserId).ToArrayAsync());
        }

        public int GetNotificationCount(Expression<Func<Notification, bool>> predicate = null)
        {
            return _db.Notifications.Where(predicate).Count();
        }

        public async Task<int> GetNotificationCountAsync(Expression<Func<Notification, bool>> predicate = null)
        {
            return await _db.Notifications.Where(predicate).CountAsync();
        }

        public IList<Notification> GetNotificationList(Int32 UserId, Int32 skip)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<Notification>> GetNotificationListAsync(Int32 UserId, Int32 skip = 0)
        {
            _notificationList = await _db.Notifications
                                                .Where(m => m.UserId == UserId)
                                                .Skip(skip)
                                                .Take(10)
                                                .OrderByDescending(m=>m.CreatedDate)
                                                .ToListAsync();
            foreach(Notification not in _notificationList)
            {
                not.IsViewed = true;
            }
            await _db.SaveChangesAsync();
            return _notificationList;
        }

        public Int32 GetNotificationTypeId(string Name)
        {
            throw new NotImplementedException();

        }

        public async Task<Int32> GetNotificationTypeIdAsync(string Name)
        {
            throw new NotImplementedException();
        }

        public string GetSubjectName(Notification.NotificationTypes NotificationType, Int32 SubjectId, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GetSubjectNameAsync(Notification.NotificationTypes NotificationType, Int32 SubjectId, Culture? culture)
        {
            switch (NotificationType)
            {
                case Notification.NotificationTypes.Receipt:
                    return await _db.Charities
                                .AsNoTracking()
                                .Where(m => m.ID == SubjectId)
                                .Select(m => m.Name)
                                .FirstOrDefaultAsync();

                case Notification.NotificationTypes.Comment:
                    var query = _db.PostTranslations
                                .AsNoTracking()
                                .Where(m => m.PostId == SubjectId && m.Culture == culture)
                                .Select(m=>m.Title)
                                .AsQueryable();
                    
                    string PostName = await query.FirstOrDefaultAsync();
                    if (String.IsNullOrEmpty(PostName))
                    {
                        culture = Culture.AZ;
                        PostName = await query.FirstOrDefaultAsync();
                    } 
                    
                    return PostName;
                default:
                    return String.Empty;
            }
        }

        public void MarkAsViewed(int NotId)
        {
            throw new NotImplementedException();
        }

        public async Task MarkAsViewedAsync(int NotId)
        {
            Notification not = await _db.Notifications.FirstOrDefaultAsync(m => m.ID == NotId);
            not.IsViewed = true;
            await _db.SaveChangesAsync();
        }

    }
}
