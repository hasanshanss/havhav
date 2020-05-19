using HavhavAz.Data;
using static HavhavAz.Helpers.Utilities;
using HavhavAz.Models;
using HavhavAz.Models.AdModels;
using HavhavAz.Models.ImageModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Mvc.Rendering;
using HavhavAz.Models.PostModels;
using System.Linq.Expressions;
using System.Data.Common;

namespace HavhavAz.Services.CRUD
{
    public class AdCRUDService : ICRUDService<Ad>
    {
        private ApplicationDbContext _db;


        public AdCRUDService(ApplicationDbContext db,
                            IServiceWrapper services)
        {

            _db = db;
        }

        public void Add(Ad model, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public async Task AddAsync(Ad ad, Culture? culture = null)
        {
            await _db.Ads.AddAsync(ad);
            await _db.SaveChangesAsync();
        }

        public void ChangeState(int id, State state)
        {
            throw new NotImplementedException();
        }

        public async Task ChangeStateAsync(int id, State state)
        {
            Ad ad = await _db.Ads.FirstOrDefaultAsync(m => m.ID == id);

            if (ad != null)
            {
                ad.State = state;
                await _db.SaveChangesAsync();
            }
        }

        public int GetCount(Culture? culture = null, Expression<Func<Ad, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetCountAsync(Culture? culture = null, Expression<Func<Ad, bool>> predicate = null)
        {
           
                var query = _db.Ads
                        .AsNoTracking()
                        .Where(m => m.State == State.Approved)
                        .AsQueryable();

                if (predicate != null)
                {
                    query = query.Where(predicate);
                }

                return await query.CountAsync();
        }

        public Ad GetModel(Culture? culture = null, Expression<Func<Ad, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<Ad> GetModelAsync(Culture? culture = null, Expression<Func<Ad, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Ad GetModelById(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Ad> GetModelByIdAsync(Int32 id, Culture? culture = null)
        {
            Ad ad = await _db.Ads.FirstOrDefaultAsync(m => m.ID == id);
            return ad;
        }

        public IList<Ad> GetModelList(Culture? culture = null,
                                    string keyword = "",
                                    int page = 1,
                                    State state = State.Approved,
                                    Expression<Func<Ad, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<Ad>> GetModelListAsync(Culture? culture = null,
                                                        string keyword = "",
                                                        int page = 1,
                                                        State state = State.Approved,
                                                        Expression<Func<Ad, bool>> predicate = null)
        {
            int pageElements = 15;
            int skip = (page - 1) * pageElements;

            var query = _db.Ads
                        .Where(m => m.State == state)
                        .Skip(skip)
                        .Take(pageElements)
                        .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            return await query.ToListAsync();
        }


        public string GetModelName(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetModelNameAsync(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public Int32 GetUserId(Int32 id, Expression<Func<Ad, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Int32> GetUserIdAsync(Int32 id, Expression<Func<Ad, bool>> predicate = null)
        {
           
                Expression<Func<Ad, bool>> lambda = null;
                if (id > 0) { lambda = m => m.ID == id; }
                else if (predicate != null) { lambda = predicate; }

                return await _db.Ads
                                .AsNoTracking()
                                .Where(lambda)
                                .Select(m => m.UserId)
                                .FirstOrDefaultAsync();
        }

        public void Remove(Int32 id)
        {
            _db.Ads.Remove(new Ad { ID = id });
            DeleteFolder($"ads/{id}");
            _db.SaveChanges();
        }

        public async Task RemoveAsync(Int32 id)
        {
            _db.Ads.Remove(new Ad { ID = id });
            DeleteFolder($"ads/{id}");
            await _db.SaveChangesAsync();
        }

        public void AddAsync(Ad model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(Ad ad, Culture? culture = null, bool isAdmin = false)
        {
            ad.LastActionDate = DateTime.Now.AddHours(11);

            var adEntry = _db.Entry(ad);
            adEntry.State = EntityState.Modified;
            adEntry.Property(e => e.UserId).IsModified = false;
            adEntry.Property(e => e.State).IsModified = false;

            await _db.SaveChangesAsync();
        }

        public void Update(Ad model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }
    }
}
