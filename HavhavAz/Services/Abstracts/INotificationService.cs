using HavhavAz.Models;
using HavhavAz.Models.NotificationModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface INotificationService
    {
        void AddNotification(Notification notification);
        Task AddNotificationAsync(Notification notification);

        IList<Notification> GetNotificationList(Int32 UserId, int skip);
        Task<IList<Notification>> GetNotificationListAsync(Int32 UserId, int skip);

        int GetNotificationCount(Expression<Func<Notification, bool>> predicate = null);
        Task<int> GetNotificationCountAsync(Expression<Func<Notification, bool>> predicate = null);

        Int32 GetNotificationTypeId(string Name);
        Task<Int32> GetNotificationTypeIdAsync(string Name);

        string GetSubjectName(Notification.NotificationTypes NotificationType, Int32 SubjectId, Culture? culture = null);
        Task<string> GetSubjectNameAsync(Notification.NotificationTypes NotificationType, Int32 SubjectId, Culture? culture = null);

        void MarkAsViewed(Int32 NotId);
        Task MarkAsViewedAsync(Int32 NotId);

        void DeleteNotifications(Int32 UserId);
        Task DeleteNotificationsAsync(Int32 UserId);
    }
}
