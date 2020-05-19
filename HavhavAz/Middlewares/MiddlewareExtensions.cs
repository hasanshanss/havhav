using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Middlewares
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseLanguageSwitcher(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<LanguageSwitcherMiddleware>();
        }

        public static IApplicationBuilder UseHttpHeaders(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<HttpHeadersMiddleware>();
        }

    }
}
