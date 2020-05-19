using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Helpers.Exceptions
{
    [Serializable]
    public class InvalidResultException : Exception
    {
        public InvalidResultException()
        {

        }

        public InvalidResultException(string ErrorMessage)
        : base(ErrorMessage)
        {

        }
    }
}
