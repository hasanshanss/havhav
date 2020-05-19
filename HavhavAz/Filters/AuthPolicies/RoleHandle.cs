using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static HavhavAz.Models.UserModels.User;

namespace HavhavAz.Filters.AuthPolicies
{
    public class RoleHandler : AuthorizationHandler<RoleRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            RoleRequirement requirement)
        {
            Enum.TryParse(context.User?.FindFirst(x => x.Type == ClaimsIdentity.DefaultRoleClaimType)?.Value, out Roles role);
            
            if (role >= requirement.Role)
            {
                context.Succeed(requirement);
            } 
            return Task.CompletedTask;
        }
    }
}
