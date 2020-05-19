using HavhavAz.Data;
using HavhavAz.Helpers;
using HavhavAz.Models;
using HavhavAz.Models.AdModels;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;

namespace HavhavAz.Services
{
    public class UserManager : IUserManager<User>
    {
        private ApplicationDbContext _db;

        public UserManager(ApplicationDbContext db,
                            IServiceWrapper services)
        {
            _db = db;
        }

        public async Task AddOrUpdateAsync(User user)
        {
            if (user.ID == 0)
            {
                user.Salt = HashGenerator.CreateSalt(8);
                user.Password = HashGenerator.GenerateSHA256Hash(user.Password, user.Salt);
                await _db.Users.AddAsync(user);
                await _db.SaveChangesAsync();

                Contacts contacts = user.Contacts;
                contacts.SubjectType = Contacts.SubjectTypes.User;
                contacts.SubjectId = user.ID;

                await _db.Contacts.AddAsync(contacts);
            }
            else
            {
                _db.Entry(user).Property(e => e.Info).IsModified = true;
                _db.Entry(user).Property(e => e.BirthDate).IsModified = true;
                _db.Entry(user).Property(e => e.DOB_Hide).IsModified = true;

                Contacts contacts = user.Contacts;
                contacts.ID = await _db.Contacts
                                        .AsNoTracking()
                                        .Where(m => m.SubjectType == Contacts.SubjectTypes.User && m.SubjectId == user.ID)
                                        .Select(m => m.ID)
                                        .FirstAsync();

                var contactsEntry = _db.Entry(user.Contacts);
                contactsEntry.State = EntityState.Modified;
                contactsEntry.Property(e => e.SubjectType).IsModified = false;
                contactsEntry.Property(e => e.SubjectId).IsModified = false;
            }

            await _db.SaveChangesAsync();
        }

        public string GetUserName(Int32 id)
        {
            return _db.Users.AsNoTracking().Where(m => m.ID == id).Select(m => m.Name).First();
        }

        public async Task<string> GetUserNameAsync(Int32 id)
        {
            return await _db.Users.AsNoTracking().Where(m => m.ID == id).Select(m => m.Name).FirstAsync();
        }

        public User GetUserByEmail(string email)
        {
            return _db.Users.AsNoTracking().FirstOrDefault(u => u.Email == email);

        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
        }

        public User GetUserForLogin(string username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUserForLoginAsync(string username, string password)
        {
            User user = await _db.Users
                        .AsNoTracking()
                        .FirstOrDefaultAsync(u => u.Username == username);

            return user?.Password == HashGenerator.GenerateSHA256Hash(password, user?.Salt) ? user : null;
        }

        public string GetUsername(Int32 id)
        {
            return _db.Users.AsNoTracking().Where(m => m.ID == id).Select(m => m.Username).First();
        }

        public async Task<string> GetUsernameAsync(Int32 id)
        {
            return await _db.Users.AsNoTracking().Where(m=>m.ID == id).Select(m => m.Username).FirstOrDefaultAsync();
        }

        public User GetUserById(Int32 id)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUserByIdAsync(Int32 id)
        {
            User user = await _db.Users
                            .AsNoTracking()
                            .Where(m => m.ID == id)
                            .FirstOrDefaultAsync();
            if (user != null)
            {
                user.Contacts = await _db.Contacts
                                        .AsNoTracking()
                                        .Where(c => c.SubjectType == Contacts.SubjectTypes.User && c.SubjectId == user.ID)
                                        .FirstOrDefaultAsync();
            }

            return user;
        }

        public void AddOrUpdate(User model)
        {
            throw new NotImplementedException();
        }

        public void ChangePassword(Int32 UserId, string NewPassword)
        {
            throw new NotImplementedException();
        }

        public async Task ChangePasswordAsync(Int32 UserId, string NewPassword)
        {
            User user = await _db.Users.FirstOrDefaultAsync(m => m.ID == UserId);
            user.Salt = HashGenerator.CreateSalt(8);
            user.Password = HashGenerator.GenerateSHA256Hash(NewPassword, user.Salt);
            user.ResetPasswordCode = "";
            await _db.SaveChangesAsync();
        }

        public User.Roles GetRoleByName(string name)
        {
            throw new NotImplementedException();
        }

        public Task<User.Roles> GetRoleByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public User GetUserByUsername(string username)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            User user = await _db.Users
                            .AsNoTracking()
                            .Where(m => m.Username.Equals(username))
                            .FirstOrDefaultAsync();
            if (user != null)
            {
                user.Contacts = await _db.Contacts
                                .AsNoTracking()
                                .Where(m => m.SubjectType == Contacts.SubjectTypes.User && m.SubjectId == user.ID)
                                .FirstOrDefaultAsync();
            }
            
            return user;
        }

        public string UpdateResetPasswordCode(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<string> UpdateResetPasswordCodeAsync(User user)
        {
            _db.Users.Attach(user);
            string NewResetPasswordCode = HashGenerator.RandomPassword(24);
            user.ResetPasswordCode = NewResetPasswordCode;
            user.ResetPasswordDate = DateTime.Now.AddHours(11);
            await _db.SaveChangesAsync();

            return NewResetPasswordCode;
        }

        public int GetUserIdByUsername(string Username)
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetUserIdByUsernameAsync(string Username)
        {
          return await _db.Users
                        .AsNoTracking()
                        .Where(m => m.Username.Equals(Username))
                        .Select(m => m.ID)
                        .FirstOrDefaultAsync();
        }

        public bool IsUserExisted(int Id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsUserExistedAsync(int Id)
        {
            return await _db.Users
                        .AsNoTracking()
                        .AnyAsync(m => m.ID == Id);
        }

        public bool IsUserExisted(string Username)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsUserExistedAsync(string Username)
        {
            return await _db.Users
                        .AsNoTracking()
                        .AnyAsync(m => m.Username.Equals(Username));
                        
        }

        public IList<User> GetListByKeyword(string keyword)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<User>> GetListByKeywordAsync(string keyword)
        {
            IList<User> userList = await _db.Users
                                        .AsNoTracking()
                                        .Where(m => m.Username.Contains(keyword) || m.Name.Contains(keyword) || m.Info.Contains(keyword))
                                        .ToListAsync();

            foreach(User user in userList)
            {
                if (user != null)
                {
                    user.Contacts = await _db.Contacts
                                    .AsNoTracking()
                                    .Where(m => m.SubjectType == Contacts.SubjectTypes.User && m.SubjectId == user.ID)
                                    .FirstOrDefaultAsync();
                }
            }

            return userList;
        }

        public int GetCount(Expression<Func<User, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetCountAsync(Expression<Func<User, bool>> predicate)
        {
            return await _db.Users.AsNoTracking().Where(predicate).CountAsync();
        }

        public void ChangeEmail(int UserId, string email)
        {
            throw new NotImplementedException();
        }

        public async Task ChangeEmailAsync(int UserId, string email)
        {
            User user = await _db.Users.SingleAsync(m => m.ID == UserId);
            user.Email = email;
            await _db.SaveChangesAsync();
        }

        public bool CheckOldPassword(int UserId, string OldPassword)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CheckOldPasswordAsync(int UserId, string NewPassword)
        {
            User user = await _db.Users.SingleAsync(m=>m.ID == UserId);
            return user.Password.Equals(HashGenerator.GenerateSHA256Hash(NewPassword, user.Salt));
        }
    }
}
