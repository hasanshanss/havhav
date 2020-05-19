using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.PostModels;
using HavhavAz.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services.TranslateServices
{
    public class PostTranslateService : ITranslateService<PostTranslations>
    {
        private ApplicationDbContext _db;

        public PostTranslateService(ApplicationDbContext db)
        {

            _db = db;
        }

        public bool IsCultureExisted(int DomainId, Culture culture)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsCultureExistedAsync(int DomainId, Culture culture)
        {
            return await _db.PostTranslations
                                .AsNoTracking()
                                .Where(m => m.PostId == DomainId)
                                .AnyAsync(m => m.Culture == culture);
        }

        public IList<Culture> GetCulturesList(Int32 DomainId)
        {
            throw new NotImplementedException();
        }
        public async Task<IList<Culture>> GetCulturesListAsync(Int32 DomainId)
        {
            return await _db.PostTranslations
                            .AsNoTracking()
                            .Where(m => m.PostId == DomainId)
                            .Select(m => m.Culture)
                            .Distinct()
                            .ToListAsync();
        }

        public void Translate(PostTranslations pt)
        {
            _db.PostTranslations.Add(pt);
            _db.SaveChanges();
        }

        public async Task TranslateAsync(PostTranslations pt)
        {
            await _db.PostTranslations.AddAsync(pt);
            await _db.SaveChangesAsync();
        }

        public bool IsUntranslated(int DomainId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsUntranslatedAsync(int DomainId)
        {
            int CulturesTotalNumber = Enum.GetNames(typeof(Culture)).Length;
            int TranslatedTotalNumber = await _db.Posts
                                            .AsNoTracking()
                                            .Where(m => m.ID == DomainId)
                                            .Select(m => m.PostTranslations.Count())
                                            .FirstOrDefaultAsync();
                                
            return TranslatedTotalNumber < CulturesTotalNumber;
        }
    }
}
