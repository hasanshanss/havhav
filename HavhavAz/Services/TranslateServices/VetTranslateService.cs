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
using System.Threading.Tasks;
using static HavhavAz.Models.ContactsModels.Contacts;

namespace HavhavAz.Services.TranslateServices
{
    public class VetTranslateService : ITranslateService<VetViewModel>
    {
        private ApplicationDbContext _db;

        public VetTranslateService(ApplicationDbContext db)
        {

            _db = db;
        }


        public bool IsCultureExisted(int DomainId, Culture culture)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsCultureExistedAsync(int DomainId, Culture culture)
        {
            return await _db.VetTranslations
                                .AsNoTracking()
                                .Where(m => m.VetId == DomainId)
                                .AnyAsync(m => m.Culture == culture);
        }


        public IList<Culture> GetCulturesList(Int32 DomainId)
        {
            throw new NotImplementedException();
        }



        public async Task<IList<Culture>> GetCulturesListAsync(Int32 DomainId)
        {
            return await _db.VetTranslations
                            .AsNoTracking()
                            .Where(m => m.VetId == DomainId)
                            .Select(m => m.Culture)
                            .Distinct()
                            .ToListAsync();
        }

        public void  Translate(VetViewModel vvm)
        {
            Vet vet = vvm.Vet;
            VetTranslations vt = vvm.VetTranslations;
            
            vt.VetId = vet.ID;
            _db.VetTranslations.Add(vt);

            Contacts contacts = _db.Contacts
                                   .Where(m => m.SubjectType == SubjectTypes.Vet && m.SubjectId == vet.ID)
                                   .FirstOrDefault();

            Address address = vvm.ContactsViewModel.Address;
            address.Culture = vt.Culture;
            contacts.Addresses.Add(address);

            _db.SaveChanges();
        }

        public async Task TranslateAsync(VetViewModel vvm)
        {
            Vet vet = vvm.Vet;
            VetTranslations vt = vvm.VetTranslations;
            await _db.VetTranslations.AddAsync(vt);

            Contacts contacts = _db.Contacts
                                   .Where(m => m.SubjectType == SubjectTypes.Vet && m.SubjectId == vet.ID)
                                   .FirstOrDefault();

            Address address = vvm.ContactsViewModel.Address;
            address.Culture = vt.Culture;
            contacts.Addresses.Add(address);

            await _db.SaveChangesAsync();
        }

        public bool IsUntranslated(int DomainId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsUntranslatedAsync(int DomainId)
        {
            int CulturesTotalNumber = Enum.GetNames(typeof(Culture)).Length;
            int TranslatedTotalNumber = await _db.Vets
                            .AsNoTracking()
                            .Where(m => m.ID == DomainId)
                            .Select(m => m.VetTranslations.Count())
                            .FirstOrDefaultAsync();
            return TranslatedTotalNumber < CulturesTotalNumber;
        }
    }
}
