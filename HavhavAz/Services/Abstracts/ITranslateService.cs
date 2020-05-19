using HavhavAz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface ITranslateService<T>
    {
        IList<Culture> GetCulturesList(Int32 DomainId);
        Task<IList<Culture>> GetCulturesListAsync(Int32 DomainId);

        bool IsUntranslated(Int32 DomainId);
        Task<bool> IsUntranslatedAsync(Int32 DomainId);

        bool IsCultureExisted(Int32 DomainId, Culture culture);
        Task<bool> IsCultureExistedAsync(Int32 DomainId, Culture culture);

        void Translate(T model);
        Task TranslateAsync(T model);
    }
}
