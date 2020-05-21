using HavhavAz.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using static HavhavAz.Models.UserModels.User;
using static HavhavAz.Helpers.Utilities;


namespace HavhavAz.Helpers
{
    public static class GeneralExtensions
    {
        public static bool IsAny<T>(this IEnumerable<T> data)
        {
            return data != null && data.Any();
        }

        public static bool Contains(this string[] source, string toCheck, StringComparison comp)
        {
            if (source == null || toCheck == null)
                return false;

            foreach (string s in source)
            {
                if (s.Equals(toCheck, StringComparison.OrdinalIgnoreCase))
                    return true;
                else
                    continue;
            }

            return false;
        }

        public static void AddHeader(this HttpContext context, string HeaderKey, string HeaderValue)
        {
            if (!context.Response.Headers.Any(m => m.Key.Equals(HeaderKey)))
            {
                context.Response.Headers.Add(HeaderKey, HeaderValue);
            }
        }

        public static int GetCurrentUserId(this HttpContext context)
        {
            string UserIdStr = context
                            .User
                            .Claims
                            .FirstOrDefault(x => x.Type == "UserId")?
                            .Value;

            Int32.TryParse(UserIdStr, out Int32 UserId);
            return UserId;
        }

        public static string GetCurrentUserName(this HttpContext context)
        {
            return context.User
                            .Claims
                            .FirstOrDefault(x => x.Type == "Name")?
                            .Value;
        }

        public static string GetCurrentUsername(this HttpContext context)
        {
            return context.User
                            .Claims
                            .FirstOrDefault(x => x.Type == "Username")?
                            .Value;
        }

        public static Roles GetCurrentUserRole(this HttpContext context)
        {
            string UserRoleStr =  context
                                    .User
                                    .Claims
                                    .FirstOrDefault(x => x.Type == ClaimsIdentity.DefaultRoleClaimType)?
                                    .Value;

            Enum.TryParse(UserRoleStr, out Roles role);
            return role;
        }

        public static Culture GetCurrentCulture(this HttpContext context)
        {
            //string cultureStr = context
            //                    .Features
            //                    .Get<IRequestCultureFeature>()
            //                    .RequestCulture
            //                    .Culture
            //                    .ToString()
            //                    .ToUpper();

            string cultureStr = Thread.CurrentThread.CurrentCulture.Name.ToUpper();
            Enum.TryParse(cultureStr, out Culture culture);

            return culture;
        }

        public static Culture GetCurrentUICulture(this HttpContext context)
        {
            string cultureStr = Thread.CurrentThread.CurrentUICulture.Name.ToUpper();
            Enum.TryParse(cultureStr, out Culture culture);
            return culture;
        }


        public static bool IsAjaxRequest(this HttpRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(HttpRequest));
            
            if(request.Headers != null)
                return request.Headers["X-Requested-With"] == "XMLHttpRequest";

            return false;
        }

        public static HtmlString ListImages(this IHtmlHelper html,
                                            string path,
                                            byte size = 1,
                                            bool isEditable = false)
        {

            return new HtmlString(ListImagesAjax(path, size, isEditable));
        }

        public static bool Contains(this string source, string toCheck, StringComparison comp)
        {
            return source != null && toCheck != null && source.IndexOf(toCheck, comp) >= 0;
        }
    }
}
