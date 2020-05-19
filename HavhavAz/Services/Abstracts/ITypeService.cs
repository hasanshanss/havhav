using HavhavAz.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface ITypeService<T>
    {
        Int32 GetIdByName(string Name);
        Task<Int32> GetIdByNameAsync(string Name);

        string GetNameById(Int32 id);
        Task<string> GetNameByIdAsync(Int32 id);

        IList<T> GetList(Culture? culture = null, Expression<Func<T, Boolean>> predicate = null);
        Task<IList<T>> GetListAsync(Culture? culture = null, Expression<Func<T, Boolean>> predicate = null);

        ICollection<SelectListItem> GetSelectList(Culture? culture = null);
        Task<ICollection<SelectListItem>> GetSelectListAsync(Culture? culture = null);

        int GetCount(Int32? TypeId, Expression<Func<T, Boolean>> predicate = null);
        Task<int> GetCountAsync(Int32? TypeId, Expression<Func<T, Boolean>> predicate = null);

        Int32 GetElementUserId(string SubjectType, Int32 SubjectId);
        Task<Int32> GetElementUserIdAsync(string SubjectType, Int32 SubjectId);
    }
}
