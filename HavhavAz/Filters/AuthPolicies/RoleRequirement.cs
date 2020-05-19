using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static HavhavAz.Models.UserModels.User;

namespace HavhavAz.Filters.AuthPolicies
{
    public class RoleRequirement : IAuthorizationRequirement
    {
        protected internal Roles Role { get; set; }

        public RoleRequirement(Roles role)
        {
            Role = role;
        }
    }
}
