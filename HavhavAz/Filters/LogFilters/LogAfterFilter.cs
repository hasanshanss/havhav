using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static HavhavAz.Services.LoggerService.LogActionInfo;
using static HavhavAz.Helpers.Utilities;
using HavhavAz.Services.LoggerService;
using Microsoft.Extensions.Logging;

namespace HavhavAz.Filters.LogFilters
{
    public class LogAfterFilter : IActionFilter
    {
        readonly LogAction _logAction;
        readonly string _message;
        private readonly ILogger<LogAfterFilter> _logger;

        public LogAfterFilter(LogAction logAction, string message, ILogger<LogAfterFilter> logger)
                          => (_logAction, _message, _logger) = (logAction, message, logger);

        public void OnActionExecuted(ActionExecutedContext context)
        {
            Int32.TryParse(context.HttpContext.User?.FindFirst(x => x.Type == "UserId")?.Value, out Int32 UserId);
            string Ip = context.HttpContext.Connection.RemoteIpAddress.ToString();
            string message = GenerateLogMessage(new LogActionInfo(Ip, UserId, _message, _logAction));

            _logger.LogWarning(message);
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            
        }
    }
}
