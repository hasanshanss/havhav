using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.ForumModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HavhavAz.Services.Types
{
    public class ForumTypeService : ITypeService<ForumType>
    {

        private ApplicationDbContext _db;
        private IList<ForumType> adTypes;

        public ForumTypeService(ApplicationDbContext db, IServiceWrapper services)
        {
            _db = db;
        }

        public int GetCount(Int32? TypeId, Expression<Func<ForumType, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountAsync(Int32? TypeId, Expression<Func<ForumType, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Int32 GetElementUserId(string SubjectType, Int32 SubjectId)
        {
            throw new NotImplementedException();
        }

        public Task<Int32> GetElementUserIdAsync(string SubjectType, Int32 SubjectId)
        {
            throw new NotImplementedException();
        }

        public Int32 GetIdByName(string Name)
        {
            throw new NotImplementedException();
        }

        public Task<Int32> GetIdByNameAsync(string Name)
        {
            throw new NotImplementedException();
        }

        public IList<ForumType> GetList(Culture? culture = null, Expression<Func<ForumType, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<IList<ForumType>> GetListAsync(Culture? culture = null, Expression<Func<ForumType, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public string GetNameById(Int32 id)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNameByIdAsync(Int32 id)
        {
            throw new NotImplementedException();
        }

        public ICollection<SelectListItem> GetSelectList(Culture? culture = null)
        {
            return _db.ForumTypes.Select(m =>
                           new SelectListItem()
                           {
                               Text = m.ForumTypeTranslations
                                       .Where(att => att.Culture == culture)
                                       .Select(att => att.Name)
                                       .FirstOrDefault(),
                               Value = m.ID.ToString()
                           }).ToList();
        }

        public async Task<ICollection<SelectListItem>> GetSelectListAsync(Culture? culture = null)
        {
            return await _db.ForumTypes.Select(m =>
                           new SelectListItem()
                           {
                               Text = m.ForumTypeTranslations
                                       .Where(att => att.Culture == culture)
                                       .Select(att => att.Name)
                                       .FirstOrDefault(),
                               Value = m.ID.ToString()
                           }).ToListAsync();
        }
    }
}
