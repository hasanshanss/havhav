using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.ShelterModels;
using HavhavAz.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;

namespace HavhavAz.Services.CRUDServices
{
    public class ShelterCRUDService : ICRUDService<Shelter>
    {
        private ApplicationDbContext _db;
        private IList<Shelter> Shelters;

        public ShelterCRUDService(ApplicationDbContext db,
                            IServiceWrapper services)
        {

            _db = db;
        }

        public async Task<Shelter> GetModelByIdAsync(Int32 id, Culture? culture = null)
        {
            Shelter Shelter = await _db.Shelters.FirstOrDefaultAsync(m => m.ID == id);

            if (Shelter != null)
            {
                await _db.Entry(Shelter)
                        .Collection(m => m.ShelterTranslations)
                        .Query()
                        .Where(m => m.Culture == culture)
                        .FirstOrDefaultAsync();

                Contacts contacts = await _db.Contacts.FirstOrDefaultAsync(m => m.SubjectType == Contacts.SubjectTypes.Shelter && m.SubjectId == Shelter.ID);
                if (contacts != null)
                {
                    await _db.Entry(contacts)
                            .Collection(m => m.Addresses)
                            .Query()
                            .Where(m => m.Culture == culture)
                            .FirstOrDefaultAsync();
                }

                Shelter.Contacts = contacts;
            }
            return Shelter;
        }

        public async Task AddAsync(Shelter shelter, Culture? culture = null)
        {
            await _db.Shelters.AddAsync(shelter);
            await _db.SaveChangesAsync();

            Contacts contacts = shelter.Contacts;
            contacts.SubjectType = Contacts.SubjectTypes.Shelter;
            contacts.SubjectId = shelter.ID;

            //don't save address if it's empty
            if (String.IsNullOrEmpty(contacts.Addresses.First().Location))
            {
                contacts.Addresses.Clear();
            }

            await _db.Contacts.AddAsync(contacts);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Shelter Shelter, Culture? culture = null, bool isAdmin = false)
        {
            var ShelterEntry = _db.Entry(Shelter);
            ShelterEntry.State = EntityState.Modified;

            //Edit ShelterTranslations
            ShelterTranslations st = Shelter.ShelterTranslations.First();
            if (st.ID != 0)
            {
                _db.Entry(st).Property(e => e.Name).IsModified = true;
                _db.Entry(st).Property(e => e.Info).IsModified = true;
                _db.Entry(st).Property(e => e.BankCredentials).IsModified = true;
            }
            else
            {
                await _db.ShelterTranslations.AddAsync(st);
            }

            //Edit Contacts
            Contacts contacts = Shelter.Contacts;
            var ContactsEntry = _db.Entry(contacts);
            ContactsEntry.State = EntityState.Modified;
            ContactsEntry.Property(m => m.SubjectId).IsModified = false;
            ContactsEntry.Property(m => m.SubjectType).IsModified = false;
                
            //Edit Address
            Address address = contacts.Addresses.First();

            if(address.ID != 0)
            {
                _db.Entry(address).Property(m => m.Location).IsModified = true;
            } else
            {
                await _db.Addresses.AddAsync(address);
            }

            await _db.SaveChangesAsync();
        }

        public Shelter GetModelById(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public Shelter GetModel(Culture? culture = null, Expression<Func<Shelter, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<Shelter> GetModelAsync(Culture? culture = null, Expression<Func<Shelter, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public IList<Shelter> GetModelList(Culture? culture = null,
                                           string keyword = "",
                                           int page = 1,
                                           State state = State.Approved,
                                           Expression<Func<Shelter, bool>> predicate = null)
        {

            var query = _db.Shelters
                            .Where(m => m.ShelterTranslations.Any(ct => ct.Culture == culture))
                            .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            //else if (!String.IsNullOrEmpty(keyword))
            //{
            //    query = query.Where(m => m.ShelterTranslations
            //                              .Any(at => at.Culture == culture
            //                                && (at.Name.Contains(keyword)
            //                                || at.Info.Contains(keyword)))
            //                       );

            //}

            int pageElements = 15;

            return query
                    .Include(m => m.ShelterTranslations)
                    .Skip((page - 1) * pageElements)
                    .Take(pageElements)
                    .ToList();

        }

        public async Task<IList<Shelter>> GetModelListAsync(Culture? culture = null,
                                           string keyword = "",
                                           int page = 1,
                                           State state = State.Approved,
                                           Expression<Func<Shelter, bool>> predicate = null)
        {
            int pageElements = 15;
            int skip = (page - 1) * pageElements;

            var query = _db.Shelters
                        .Where(m => m.ShelterTranslations.Any(ct => ct.Culture == culture))
                        .Skip(skip)
                        .Take(pageElements)
                        .OrderBy(m=>m.Position)
                        .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            

            IList<Shelter> shelterList = await query.ToListAsync();

            foreach (Shelter Shelter in shelterList)
            {
                if (Shelter != null)
                {
                    await _db.Entry(Shelter)
                            .Collection(m => m.ShelterTranslations)
                            .Query()
                            .Where(m => m.Culture == culture)
                            .FirstAsync();

                    Shelter.Contacts = await _db.Contacts.FirstOrDefaultAsync(m => m.SubjectType == Contacts.SubjectTypes.Shelter && m.SubjectId == Shelter.ID);
                    if (Shelter.Contacts != null)
                    {
                        await _db.Entry(Shelter.Contacts)
                                .Collection(m => m.Addresses)
                                .Query()
                                .Where(m => m.Culture == culture)
                                .FirstOrDefaultAsync();
                    }

                    
                }
            }

            return shelterList;
        }

        public void Add(Shelter model, Culture? culture = null)
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
            _db.Shelters.Remove(new Shelter { ID = id });
            DeleteFolder($"shelters/{id}");
            _db.SaveChanges();
        }

        public async Task RemoveAsync(Int32 id)
        {
            _db.Shelters.Remove(new Shelter { ID = id });

            //remove Contacts
            Contacts contacts = await _db.Contacts.Where(m => m.SubjectType == Contacts.SubjectTypes.Vet && m.SubjectId == id).FirstOrDefaultAsync();
            _db.Entry(contacts).State = EntityState.Deleted;

            await _db.SaveChangesAsync();

            DeleteFolder($"shelters/{id}");
        }



        public void AddAsync(Shelter model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }

        public Int32 GetUserId(Int32 id, Expression<Func<Shelter, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Int32> GetUserIdAsync(Int32 id, Expression<Func<Shelter, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public int GetCount(Culture? culture = null, Expression<Func<Shelter, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountAsync(Culture? culture = null, Expression<Func<Shelter, bool>> predicate = null)
        {
            var query = _db.Shelters
                        .AsNoTracking()
                        .Where(m => m.ShelterTranslations.Any(at => at.Culture == culture))
                        .AsQueryable();

            if (predicate != null)
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
            Shelter Shelter = await _db.Shelters.FirstOrDefaultAsync(m => m.ID == id);
            if (Shelter != null)
            {
                await _db.SaveChangesAsync();
            }
        }

        public void Update(Shelter model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }
    }
}
