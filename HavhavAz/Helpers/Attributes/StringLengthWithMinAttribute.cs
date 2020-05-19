using HavhavAz.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Helpers.Attributes
{
    public class StringLengthWithMinAttribute : StringLengthAttribute
    {
        public StringLengthWithMinAttribute() : this(100, 6)
        {
        }

        public StringLengthWithMinAttribute(int maximumLength, int minimumLength) : base(maximumLength)
        {
            base.ErrorMessageResourceName = "StringLengthWithMin";
            base.ErrorMessageResourceType = typeof(ValidationMessages);
            base.MinimumLength = minimumLength;
        }
    }
}
