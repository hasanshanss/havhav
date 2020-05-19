using HavhavAz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface ICRUDService<T>
    {
        T GetModelById(Int32 id, Culture? culture = null);
        Task<T> GetModelByIdAsync(Int32 id, Culture? culture = null);

        T GetModel(Culture? culture = null, Expression<Func<T, Boolean>> predicate = null);
        Task<T> GetModelAsync(Culture? culture = null, Expression<Func<T, Boolean>> predicate = null);

        IList<T> GetModelList(Culture? culture = null, 
                              string keyword = "", 
                              int page = 1, 
                              State state = State.Approved, 
                              Expression<Func<T, Boolean>> predicate = null);

        Task<IList<T>> GetModelListAsync(Culture? culture = null,
                              string keyword = "",
                              int page = 1,
                              State state = State.Approved,
                              Expression<Func<T, Boolean>> predicate = null);

        int GetCount(Culture? culture = null, Expression<Func<T, Boolean>> predicate = null);
        Task<int> GetCountAsync(Culture? culture = null, Expression<Func<T, Boolean>> predicate = null);

        void Add(T model, Culture? culture = null);
        Task AddAsync(T model, Culture? culture = null);

        void Update(T model, Culture? culture = null, bool isAdmin = false);
        Task UpdateAsync(T model, Culture? culture = null, bool isAdmin = false);

        string GetModelName(Int32 id, Culture? culture = null);
        Task<string> GetModelNameAsync(Int32 id, Culture? culture = null);

        void Remove(Int32 id);
        Task RemoveAsync(Int32 id);

        Int32 GetUserId(Int32 id, Expression<Func<T, Boolean>> predicate = null);
        Task<Int32> GetUserIdAsync(Int32 id, Expression<Func<T, Boolean>> predicate = null);

        void ChangeState(Int32 id, State state);
        Task ChangeStateAsync(Int32 id, State state);
    }
}
