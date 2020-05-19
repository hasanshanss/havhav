using HavhavAz.Models;
using HavhavAz.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface IUserManager<T>
    {
        void AddOrUpdate(T model);
        Task AddOrUpdateAsync(T model);

        bool IsUserExisted(Int32 Id);
        Task<bool> IsUserExistedAsync(Int32 Id);

        bool IsUserExisted(string Username);
        Task<bool> IsUserExistedAsync(string Username);

        void ChangeEmail(Int32 UserId, string email);
        Task ChangeEmailAsync(Int32 UserId, string email);

        void ChangePassword(Int32 UserId, string NewPassword);
        Task ChangePasswordAsync(Int32 UserId, string NewPassword);

        bool CheckOldPassword(Int32 UserId, string OldPassword);
        Task<bool> CheckOldPasswordAsync(Int32 UserId, string OldPassword);

        string UpdateResetPasswordCode(User user);
        Task<string> UpdateResetPasswordCodeAsync(User user);

        T GetUserByEmail(string email);
        Task<T> GetUserByEmailAsync(string email);

        T GetUserByUsername(string username);
        Task<T> GetUserByUsernameAsync(string username);

        T GetUserById(Int32 id);
        Task<T> GetUserByIdAsync(Int32 id);

        T GetUserForLogin(string email, string password);
        Task<T> GetUserForLoginAsync(string email, string password);

        string GetUsername(Int32 id);
        Task<string> GetUsernameAsync(Int32 id);

        string GetUserName(Int32 id);
        Task<string> GetUserNameAsync(Int32 id);

        User.Roles GetRoleByName(string name);
        Task<User.Roles> GetRoleByNameAsync(string name);

        Int32 GetUserIdByUsername(string Username);
        Task<Int32> GetUserIdByUsernameAsync(string Username);

        IList<T> GetListByKeyword(string keyword);
        Task<IList<T>> GetListByKeywordAsync(string keyword);

        int GetCount(Expression<Func<User,bool>> predicate);
        Task<int> GetCountAsync(Expression<Func<User, bool>> predicate);
    }
}
