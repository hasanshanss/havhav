using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.VetModels;
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
    public class VetCRUDService : ICRUDService<Vet>
    {
        private ApplicationDbContext _db;
        private IList<Vet> Vets;

        public VetCRUDService(ApplicationDbContext db,
                            IServiceWrapper services)
        {

            _db = db;
        }

        public async Task<Vet> GetModelByIdAsync(Int32 id, Culture? culture = null)
        {
            Vet Vet = await _db.Vets.FirstOrDefaultAsync(m => m.ID == id);

            if (Vet != null)
            {
                await _db.Entry(Vet)
                        .Collection(m => m.VetTranslations)
                        .Query()
                        .Where(m => m.Culture == culture)
                        .FirstOrDefaultAsync();

                Contacts contacts = await _db.Contacts.FirstOrDefaultAsync(m => m.SubjectType == Contacts.SubjectTypes.Vet && m.SubjectId == Vet.ID);
                if (contacts != null)
                {
                    await _db.Entry(contacts)
                            .Collection(m => m.Addresses)
                            .Query()
                            .Where(m => m.Culture == culture)
                            .FirstOrDefaultAsync();
                }

                Vet.Contacts = contacts;
            }
            return Vet;
        }

        public async Task AddAsync(Vet shelter, Culture? culture = null)
        {
            await _db.Vets.AddAsync(shelter);
            await _db.SaveChangesAsync();

            Contacts contacts = shelter.Contacts;
            contacts.SubjectType = Contacts.SubjectTypes.Vet;
            contacts.SubjectId = shelter.ID;

            //don't save address if it's empty
            if (String.IsNullOrEmpty(contacts.Addresses.First().Location))
            {
                contacts.Addresses.Clear();
            }

            await _db.Contacts.AddAsync(contacts);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Vet Vet, Culture? culture = null, bool isAdmin = false)
        {
            var VetEntry = _db.Entry(Vet);
            VetEntry.State = EntityState.Modified;

            //Edit VetTranslations
            VetTranslations st = Vet.VetTranslations.First();
            if (st.ID != 0)
            {
                _db.Entry(st).Property(e => e.Name).IsModified = true;
                _db.Entry(st).Property(e => e.Info).IsModified = true;
            }
            else
            {
                await _db.VetTranslations.AddAsync(st);
            }

            //Edit Contacts
            Contacts contacts = Vet.Contacts;
            var ContactsEntry = _db.Entry(contacts);
            ContactsEntry.State = EntityState.Modified;
            ContactsEntry.Property(m => m.SubjectId).IsModified = false;
            ContactsEntry.Property(m => m.SubjectType).IsModified = false;

            //Edit Address
            Address address = contacts.Addresses.First();

            if (address.ID != 0)
            {
                _db.Entry(address).Property(m => m.Location).IsModified = true;
            }
            else
            {
                await _db.Addresses.AddAsync(address);
            }

            await _db.SaveChangesAsync();
        }

        public Vet GetModelById(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public Vet GetModel(Culture? culture = null, Expression<Func<Vet, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<Vet> GetModelAsync(Culture? culture = null, Expression<Func<Vet, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public IList<Vet> GetModelList(Culture? culture = null,
                                           string keyword = "",
                                           int page = 1,
                                           State state = State.Approved,
                                           Expression<Func<Vet, bool>> predicate = null)
        {

            var query = _db.Vets
                            .Where(m => m.VetTranslations.Any(ct => ct.Culture == culture))
                            .OrderBy(m => m.Position)
                            .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            int pageElements = 15;

            return query
                    .Include(m => m.VetTranslations)
                    .Skip((page - 1) * pageElements)
                    .Take(pageElements)
                    .ToList();

        }

        public async Task<IList<Vet>> GetModelListAsync(Culture? culture = null,
                                           string keyword = "",
                                           int page = 1,
                                           State state = State.Approved,
                                           Expression<Func<Vet, bool>> predicate = null)
        {



            int pageElements = 15;
            int skip = (page - 1) * pageElements;

            var query = _db.Vets
                        .Where(m => m.VetTranslations.Any(ct => ct.Culture == culture))
                        .Skip(skip)
                        .Take(pageElements)
                        .OrderBy(m => m.Position)
                        .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            IList<Vet> vetList = await query.ToListAsync();

            foreach (Vet Vet in vetList)
            {
                if (Vet != null)
                {
                    //load VetTranslations
                    await _db.Entry(Vet)
                           .Collection(m => m.VetTranslations)
                           .Query()
                           .Where(m => m.Culture == culture)
                           .FirstAsync();

                    //load Contacts
                    Vet.Contacts = await _db.Contacts
                                    .Where(m => m.SubjectType == Contacts.SubjectTypes.Vet && m.SubjectId == Vet.ID)
                                    .FirstOrDefaultAsync();

                    if (Vet.Contacts != null)
                    {
                        //load Address
                        await _db.Entry(Vet.Contacts)
                               .Collection(m => m.Addresses)
                               .Query()
                               .Where(m => m.Culture == culture)
                               .FirstOrDefaultAsync();
                    }

                }
            }

            return vetList;
        }

        public void Add(Vet model, Culture? culture = null)
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
            _db.Vets.Remove(new Vet { ID = id });
            DeleteFolder($"vets/{id}");
            _db.SaveChanges();
        }

        public async Task RemoveAsync(Int32 id)
        {
            _db.Vets.Remove(new Vet { ID = id });

            //remove Contacts
            Contacts contacts = await _db.Contacts.Where(m => m.SubjectType == Contacts.SubjectTypes.Vet && m.SubjectId == id).FirstOrDefaultAsync();
            _db.Entry(contacts).State = EntityState.Deleted;

            await _db.SaveChangesAsync();

            DeleteFolder($"vets/{id}");
        }



        public void AddAsync(Vet model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }

        public Int32 GetUserId(Int32 id, Expression<Func<Vet, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Int32> GetUserIdAsync(Int32 id, Expression<Func<Vet, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public int GetCount(Culture? culture = null, Expression<Func<Vet, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountAsync(Culture? culture = null, Expression<Func<Vet, bool>> predicate = null)
        {
            var query = _db.Vets
                        .AsNoTracking()
                        .Where(m => m.VetTranslations.Any(at => at.Culture == culture))
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
            Vet Vet = await _db.Vets.FirstOrDefaultAsync(m => m.ID == id);
            if (Vet != null)
            {
                await _db.SaveChangesAsync();
            }
        }

        public void Update(Vet model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }
    }
}
