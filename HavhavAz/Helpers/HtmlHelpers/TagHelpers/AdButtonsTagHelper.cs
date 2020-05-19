//using HavhavAz.Models;
//using HavhavAz.Models.AdModels;
//using HavhavAz.Services.Interfaces;
//using Microsoft.AspNetCore.Html;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Localization;
//using Microsoft.AspNetCore.Mvc.Rendering;
//using Microsoft.AspNetCore.Mvc.ViewComponents;
//using Microsoft.AspNetCore.Razor.TagHelpers;
//using Microsoft.Extensions.Localization;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace HavhavAz.Helpers.HtmlHelpers.TagHelpers
//{
//    public class AdButtonsTagHelper : TagHelper
//    {
//        private IStringLocalizer<SharedResource> _sharedLocalizer;

//        public AdButtonsTagHelper(IServiceWrapper services,
//                         IStringLocalizer<SharedResource> sharedLocalizer)
//        {
//            _sharedLocalizer = sharedLocalizer;
//        }

//        public string Culture { get; set; }

//        public override void Process(TagHelperContext context, TagHelperOutput output)
//        {
//            StringBuilder html = new StringBuilder($"<a href='/Charity' class='menu-button-1'>{_sharedLocalizer["Menu.Charity"]}</a>");


//            int count = 1;
//            foreach (AdType adType in adTypes)
//            {
//                count++;
//                html.Append($"<a href='Ad?ati={adType.ID}' class='menu-button-{count}'>{adType.AdTypeTranslations.First().Name}</a>");
//            }

//            html.Append($"<a href='Ad/Create' class='menu-button-{count + 1}'>{_sharedLocalizer["Create"]}</a>");

//            output.TagName = "div";
//            output.Attributes.Add("class", "button-box");
//            output.TagMode = TagMode.StartTagAndEndTag;
//            output.Content.SetHtmlContent(html.ToString());


//        }

//        private List<SelectListItem> GenerateAdTypeSelectList()
//        {
//            return Enum.GetValues(typeof(Ad.AdTypes)).Cast<Ad.AdTypes>()
//                                                  .Select(at =>
//                    new SelectListItem
//                    {
//                        Value = ((byte)at).ToString(),
//                        Text = _sharedLocalizer[$"Menu.Ad.{at.ToString()}"]
//                    })
//                    .ToList();
//        }

//    }
//}
