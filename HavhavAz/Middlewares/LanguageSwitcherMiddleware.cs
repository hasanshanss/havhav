using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Middlewares
{
    public class LanguageSwitcherMiddleware
    {
        private readonly RequestDelegate _next;

        public LanguageSwitcherMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            string culture = context.Request.Query["culture"];
            if (!String.IsNullOrEmpty(culture))
            {
                context.Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );
            }
            

            //return LocalRedirect(returnUrl);
            await _next.Invoke(context);
        }
    }
}
    

