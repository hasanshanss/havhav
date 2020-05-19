using HavhavAz.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static HavhavAz.Models.UserModels.User;

namespace HavhavAz.Filters
{
    public class StateValidationFilter : IAuthorizationFilter
    {
        public StateValidationFilter()
        {
            
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var httpContext = context.HttpContext;

            Byte.TryParse(httpContext.Request.Query["state"].FirstOrDefault(), out byte state);
            string controller = httpContext.Request.RouteValues["controller"].ToString();
            Roles role = httpContext.GetCurrentUserRole();

            if (role != Roles.Admin && state > 2)
            {
                context.Result = new RedirectToActionResult("Index", controller, new { });
            }
        }
    }
}
