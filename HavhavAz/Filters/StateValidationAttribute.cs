using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HavhavAz.Filters
{
    public class StateValidationAttribute : TypeFilterAttribute
    {
        public StateValidationAttribute() : base(typeof(StateValidationFilter))
        {
            Arguments = new object[] {  };
        }
    }
}
