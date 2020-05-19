using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HavhavAz.Helpers.HtmlHelpers.TagHelpers
{
    public class NoResultTxtTagHelper : TagHelper
    {
        private IStringLocalizer<SharedResource> _sharedLocalizer;

        public NoResultTxtTagHelper(IStringLocalizer<SharedResource> sharedLocalizer)
        {
            _sharedLocalizer = sharedLocalizer;
        }


        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            StringBuilder html = new StringBuilder("<div class='col-md-12 box'>");
            html.Append($"{ _sharedLocalizer["NoResult"]}</div>");

            output.TagName = "div";
            output.Attributes.Add("class", "row m-auto");
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(html.ToString());
        }
    }
}