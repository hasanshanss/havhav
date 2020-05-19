using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HavhavAz.Models.ImageModels;
using static HavhavAz.Helpers.Utilities;
using HavhavAz.Models.PostModels;
using System.Linq.Expressions;
using System.Data.Common;

namespace HavhavAz.Services.CRUD
{
    public class CharityCRUDService : ICRUDService<Charity>
    {
        private ApplicationDbContext _db;
        private IList<Charity> charities;

        public CharityCRUDService(ApplicationDbContext db,
                            IServiceWrapper services)
        {
            
            _db = db;
        }
        
        public async Task<Charity> GetModelByIdAsync(Int32 id, Culture? culture = null)
        {
            Charity charity = await _db.Charities.FirstOrDefaultAsync(m => m.ID == id);
            return charity;

        }

        public async Task AddAsync(Charity charity, Culture? culture = null)
        {
            await _db.Charities.AddAsync(charity);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Charity charity, Culture? culture = null, bool isAdmin = false)
        {

            charity.LastActionDate = DateTime.Now.AddHours(11);

            var charityEntry = _db.Entry(charity);
            charityEntry.State = EntityState.Modified;
            charityEntry.Property(e => e.UserId).IsModified = false;
            charityEntry.Property(e => e.State).IsModified = false;

            await _db.SaveChangesAsync();
        }

            public Charity GetModelById(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public Charity GetModel(Culture? culture = null, Expression<Func<Charity, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<Charity> GetModelAsync(Culture? culture = null, Expression<Func<Charity, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public IList<Charity> GetModelList(Culture? culture = null, 
                                           string keyword = "", 
                                           int page = 1, 
                                           State state = State.Approved, 
                                           Expression<Func<Charity, bool>> predicate = null)
        {
            
            var query = _db.Charities
                            .Where(m => m.State == state)
                            .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            //else if (!String.IsNullOrEmpty(keyword))
            //{
            //    query = query.Where(m => m.CharityTranslations
            //                              .Any(at => at.Culture == culture
            //                                && (at.Name.Contains(keyword)
            //                                || at.Info.Contains(keyword)))
            //                       );
                
            //}

            int pageElements = 15;

            return query
                    .Skip((page - 1) * pageElements)
                    .Take(pageElements)
                    .ToList();

        }

        public async Task<IList<Charity>> GetModelListAsync(Culture? culture = null,
                                           string keyword = "",
                                           int page = 1,
                                           State state = State.Approved,
                                           Expression<Func<Charity, bool>> predicate = null)
        {
            int pageElements = 15;
            int skip = (page - 1) * pageElements;

            var query = _db.Charities
                        .Where(m => m.State == state)
                        .Skip(skip)
                        .Take(pageElements)
                        .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            //else if (!String.IsNullOrEmpty(keyword))
            //{
            //    query = query.Where(m => m.CharityTranslations
            //                              .Any(at => at.Culture == culture
            //                                && (at.Name.Contains(keyword)
            //                                || at.Info.Contains(keyword)))
            //                       );

            //}

            return await query.ToListAsync();
        }

        public void Add(Charity model, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public string GetModelName(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetModelNameAsync(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public void Remove(Int32 id)
        {
                _db.Charities.Remove(new Charity { ID = id });
                 DeleteFolder($"charities/{id}");
                _db.SaveChanges();
            


        }

        public async Task RemoveAsync(Int32 id)
        {
            _db.Charities.Remove(new Charity { ID = id });
            DeleteFolder($"charities/{id}");
            await _db.SaveChangesAsync();
        }

    

        public void AddAsync(Charity model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }

        public Int32 GetUserId(Int32 id, Expression<Func<Charity, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Int32> GetUserIdAsync(Int32 id, Expression<Func<Charity, bool>> predicate = null)
        {
            Expression<Func<Charity, bool>> lambda = null;
            if (id > 0) { lambda = m => m.ID == id; }
            else if (predicate != null) { lambda = predicate; }

            return await _db.Charities
                            .AsNoTracking()
                            .Where(lambda)
                            .Select(m => m.UserId)
                            .FirstOrDefaultAsync();
        }

        public int GetCount(Culture? culture = null, Expression<Func<Charity, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountAsync(Culture? culture = null, Expression<Func<Charity, bool>> predicate = null)
        {
            var query = _db.Charities
                        .AsNoTracking()
                        .Where(m => m.State == State.Approved)
                        .AsQueryable();
                    
            if(predicate != null)
            {
                query = query.Where(predicate);
            }
                    
            return query.CountAsync();
        }

        public void ChangeState(int id, State state)
        {
            throw new NotImplementedException();
        }

        public async Task ChangeStateAsync(int id, State state)
        {
            Charity charity = await _db.Charities.FirstOrDefaultAsync(m => m.ID == id);
            if (charity != null)
            {
                charity.State = state;
                charity.LastActionDate = DateTime.Now.AddHours(11);
                await _db.SaveChangesAsync();
            }
        }

        public void Update(Charity model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }
    }
}
