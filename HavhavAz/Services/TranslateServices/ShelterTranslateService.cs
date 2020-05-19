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
using System.Threading.Tasks;
using static HavhavAz.Models.ContactsModels.Contacts;

namespace HavhavAz.Services.TranslateServices
{
    public class ShelterTranslateService : ITranslateService<ShelterViewModel>
    {
        private ApplicationDbContext _db;

        public ShelterTranslateService(ApplicationDbContext db)
        {

            _db = db;
        }


        public bool IsCultureExisted(int DomainId, Culture culture)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsCultureExistedAsync(int DomainId, Culture culture)
        {
            return await _db.ShelterTranslations
                                .AsNoTracking()
                                .Where(m => m.ShelterId == DomainId)
                                .AnyAsync(m => m.Culture == culture);
        }


        public IList<Culture> GetCulturesList(Int32 DomainId)
        {
            throw new NotImplementedException();
        }



        public async Task<IList<Culture>> GetCulturesListAsync(Int32 DomainId)
        {
            return await _db.ShelterTranslations
                            .AsNoTracking()
                            .Where(m => m.ShelterId == DomainId)
                            .Select(m => m.Culture)
                            .Distinct()
                            .ToListAsync();
        }

        public void Translate(ShelterViewModel svm)
        {
            Shelter shelter = svm.Shelter;
            ShelterTranslations st = svm.ShelterTranslations;
            _db.ShelterTranslations.Add(st);

            Contacts contacts = _db.Contacts
                                   .Where(m => m.SubjectType == SubjectTypes.Shelter && m.SubjectId == shelter.ID)
                                   .FirstOrDefault();

            Address address = svm.ContactsViewModel.Address;
            address.Culture = st.Culture;
            contacts.Addresses.Add(address);

            _db.SaveChanges();
        }

        public async Task TranslateAsync(ShelterViewModel svm)
        {
            Shelter shelter = svm.Shelter;
            ShelterTranslations st = svm.ShelterTranslations;

            st.ShelterId = shelter.ID;
            await _db.ShelterTranslations.AddAsync(st);

            Contacts contacts = _db.Contacts
                                   .Where(m => m.SubjectType == SubjectTypes.Shelter && m.SubjectId == shelter.ID)
                                   .FirstOrDefault();

            Address address = svm.ContactsViewModel.Address;
            address.Culture = st.Culture;
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
            int TranslatedTotalNumber = await _db.Shelters
                            .AsNoTracking()
                            .Where(m => m.ID == DomainId)
                            .Select(m => m.ShelterTranslations.Count())
                            .FirstOrDefaultAsync();
            return TranslatedTotalNumber < CulturesTotalNumber;
        }
    }
}
