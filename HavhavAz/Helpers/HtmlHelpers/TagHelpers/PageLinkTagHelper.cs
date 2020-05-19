using HavhavAz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace HavhavAz.Helpers.HtmlHelpers.TagHelpers
{
    public class PageLinkTagHelper : TagHelper
    {
        public PageLinkTagHelper()
        {
            
        }
        
        public PageViewModel PageModel { get; set; }
        public string Url { get; set; }

        private NameValueCollection queryStringCollection;

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "div";

            TagBuilder tag = new TagBuilder("ul");
            tag.AddCssClass("pagination");

            int availablePages = PageModel.TotalPages;
            int pageNumber = PageModel.PageNumber;
            string queryString = String.Empty;

            if (Url.Contains("?"))
            {
                queryString =  Url.Substring(Url.IndexOf('?'));
                Url = Url.Substring(0, Url.IndexOf('?'));
            } 
            
            queryStringCollection = HttpUtility.ParseQueryString(queryString);

            AppendPreviousPages(pageNumber, ref tag);
            TagBuilder currentItem = CreateTag(pageNumber);
            tag.InnerHtml.AppendHtml(currentItem);
            AppendNextPages(pageNumber, ref tag);

            output.Content.AppendHtml(tag);
        }

        TagBuilder CreateTag(int pageNumber)
        {
            TagBuilder item = new TagBuilder("li");
            TagBuilder link = new TagBuilder("a");
            if (pageNumber == this.PageModel.PageNumber)
            {
                item.AddCssClass("active");
            }
            else
            {
                queryStringCollection["page"] = pageNumber.ToString();

                queryStringCollection.Remove("status");
                queryStringCollection.Remove("accion");

                string queryString = queryStringCollection.ToString();
                string connotationMark = queryString.Contains("?") ? "&" : "?";
                link.Attributes["href"] = $"{Url}{connotationMark}{queryString}";
            }

            link.InnerHtml.Append(pageNumber.ToString());
            item.InnerHtml.AppendHtml(link);
            return item;
        }

        private void AppendPreviousPages(int pageNumber,
                                    ref TagBuilder tag,
                                    int limit = 3)
        {
            for (int i = limit; i >= 1; i--)
            {
                if ((pageNumber - i) < 1)
                {
                    continue;
                }

                TagBuilder previousItem = CreateTag(pageNumber - i);
                tag.InnerHtml.AppendHtml(previousItem);
            }
        }

        private void AppendNextPages(int pageNumber,
                                    ref TagBuilder tag,
                                    int limit = 3)
        {
            for (int i = 1; i <= limit; i++)
            {
                if ((pageNumber + i) > PageModel.TotalPages)
                {
                    break;
                }

                TagBuilder nextItem = CreateTag(pageNumber + i);
                tag.InnerHtml.AppendHtml(nextItem);
            }
        }
    }
}
