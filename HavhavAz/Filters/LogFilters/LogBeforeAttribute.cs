using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static HavhavAz.Services.LoggerService.LogActionInfo;

namespace HavhavAz.Filters.LogFilters
{
    public class LogBeforeAttribute : TypeFilterAttribute
    {
        public LogBeforeAttribute(LogAction LogAction, string Message = "") : base(typeof(LogBeforeFilter))
        {
            Arguments = new object[] { LogAction, Message };
        }
    }
}
