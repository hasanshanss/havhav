using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static HavhavAz.Services.LoggerService.LogActionInfo;

namespace HavhavAz.Filters.LogFilters
{
    public class LogAfterAttribute : TypeFilterAttribute
    {
        public LogAfterAttribute(LogAction LogAction, string Message = "") : base(typeof(LogAfterFilter))
        {
            Arguments = new object[] { LogAction, Message };
        }
    }
}
