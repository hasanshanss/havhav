#pragma checksum "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "81dd028c41729893960bbf84e6651b44a07bdcb5"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared_Components_Comments_Default), @"mvc.1.0.view", @"/Views/Shared/Components/Comments/Default.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using HavhavAz;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using HavhavAz.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using HavhavAz.Validation;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using static HavhavAz.Helpers.Utilities;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using static HavhavAz.Helpers.HtmlSanitizer;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using static HavhavAz.Helpers.GeneralExtensions;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using HavhavAz.Helpers.HtmlHelpers.TagHelpers;

#line default
#line hidden
#nullable disable
#nullable restore
#line 10 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using Microsoft.AspNetCore.Mvc.Localization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 11 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using System.Globalization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 12 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using System.IO;

#line default
#line hidden
#nullable disable
#nullable restore
#line 13 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using Microsoft.AspNetCore.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 14 "C:\Users\User\source\repos\havhav\HavhavAz\Views\_ViewImports.cshtml"
using System.Security.Claims;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
using HavhavAz.Models.CommentModels;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
using static HavhavAz.Models.UserModels.User;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"81dd028c41729893960bbf84e6651b44a07bdcb5", @"/Views/Shared/Components/Comments/Default.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6449dd936dc5103b650bd6c6c5b20a35cac0fa8d", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared_Components_Comments_Default : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<CommentViewModel>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 5 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
  
    string Username = Context.GetCurrentUsername();
    Int32 UserId = Context.GetCurrentUserId();

    Roles role = Context.GetCurrentUserRole();
    bool isAdmin = role == Roles.Admin;

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
            WriteLiteral("<div class=\"container mt-2 m-auto\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12 box comment_block\">\r\n            <div class=\"new_comment\">\r\n");
#nullable restore
#line 18 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                 if (Model != null && Model.HasNext)
                {

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <div class=\"row\">\r\n                        <div class=\"col-md-12 text-center\">\r\n                            <button class=\"button clickable\" id=\"showMore\" onclick=\"showMore()\">");
#nullable restore
#line 22 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                                                                           Write(SharedLocalizer["Comment.ShowPrevious"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</button>\r\n                        </div>\r\n                    </div>\r\n");
#nullable restore
#line 25 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                }

#line default
#line hidden
#nullable disable
            WriteLiteral("                <ul class=\"user_comment\">\r\n");
#nullable restore
#line 27 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                     if (Model.CommentPublisherList != null && Model.CommentPublisherList.Count > 0)
                    {
                        

#line default
#line hidden
#nullable disable
#nullable restore
#line 29 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                         foreach (CommentPublisher cp in Model.CommentPublisherList)
                        {

                            string Publisher = cp.Publisher;
                            Comment comment = cp.Comment;


#line default
#line hidden
#nullable disable
            WriteLiteral(@"                            <li>
                                <div class=""row"">
                                    <div class=""col-3 col-sm-2 col-md-2 col-lg-1 mt-4"">
                                        <div class=""user_avatar"">
                                            <img alt=""Azərbaycanda heyvansevərlər üçün ilk və tək sosial şəbəkə""");
            BeginWriteAttribute("src", " src=\"", 1643, "\"", 1706, 1);
#nullable restore
#line 39 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
WriteAttributeValue("", 1649, Url.Content($"/images/{GetMainPic("users", Publisher)}"), 1649, 57, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(@" width=""50"" height=""50"">
                                        </div>

                                    </div>
                                    <div class=""col-9 col-sm-10 col-md-11"">
                                        <div class=""comment_body""");
            BeginWriteAttribute("id", " id=\"", 1969, "\"", 1993, 2);
            WriteAttributeValue("", 1974, "comment-", 1974, 8, true);
#nullable restore
#line 44 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
WriteAttributeValue("", 1982, comment.ID, 1982, 11, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n");
#nullable restore
#line 45 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                             if (UserId == comment.UserId || isAdmin)
                                            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                                                <span class=\"comment-delete orange clickable\" style=\"float:right\">x</span>\r\n");
#nullable restore
#line 48 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                            }

#line default
#line hidden
#nullable disable
            WriteLiteral("                                            <div>\r\n                                                <a");
            BeginWriteAttribute("href", " href=\"", 2403, "\"", 2435, 2);
            WriteAttributeValue("", 2410, "/Account/Index/", 2410, 15, true);
#nullable restore
#line 50 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
WriteAttributeValue("", 2425, Publisher, 2425, 10, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" class=\"orange\">\r\n                                                    <span style=\"font-size:13px; word-break:break-all;\">");
#nullable restore
#line 51 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                                                                                   Write(Publisher);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n                                                </a>\r\n                                            </div>\r\n                                            <p class=\"wrappable\">\r\n                                                ");
#nullable restore
#line 55 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                           Write(comment.Content);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
                                            </p>

                                            <div class=""row comment_toolbar"">
                                                <div class=""col-12 col-md-12"">
                                                    <div class=""comment_tools text-right"">
                                                        <ul>
                                                            <li>
                                                                <i class=""fa fa-clock-o icon""></i> ");
#nullable restore
#line 63 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                                                                              Write(comment.Date.ToString("HH:mm"));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n                                                            </li>\r\n                                                            <li>\r\n                                                                <i class=\"fa fa-calendar icon mr-1\"></i>");
#nullable restore
#line 66 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                                                                                   Write(comment.Date.ToString("dd.MM.yyyy"));

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </li>
");
#nullable restore
#line 77 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                        }

#line default
#line hidden
#nullable disable
#nullable restore
#line 77 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                         


                    }
                    else
                    {

#line default
#line hidden
#nullable disable
            WriteLiteral("                        <li id=\"firstCommentText\">\r\n                            <h5 class=\"fb-title text-center\">");
#nullable restore
#line 84 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                                        Write(SharedLocalizer["Comment.First"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</h5>\r\n                        </li>\r\n");
#nullable restore
#line 86 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                    }

#line default
#line hidden
#nullable disable
            WriteLiteral(@"                </ul>

                <hr style=""background-color: orange;"" />
                <div class=""create_new_comment"">
                    <div class=""row"">
                        <div class=""col-3 col-sm-2 col-md-2 col-lg-1 avatar_box"">
                            <img alt=""Azərbaycanda heyvansevərlər üçün ilk və tək sosial şəbəkə"" class=""img-fluid avatar""");
            BeginWriteAttribute("src", " src=\"", 4807, "\"", 4869, 1);
#nullable restore
#line 93 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
WriteAttributeValue("", 4813, Url.Content($"/images/{GetMainPic("users", Username)}"), 4813, 56, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(@">
                        </div>
                        <div class=""col-8 col-sm-9 col-md-9 col-lg-10"">
                            <div class=""input_comment"">
                                <input class=""fb-input messagebox"" id=""send_input"" type=""text""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 5129, "\"", 5184, 2);
#nullable restore
#line 97 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
WriteAttributeValue("", 5143, SharedLocalizer["Comment.Placeholder"], 5143, 39, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 5182, "..", 5182, 2, true);
            EndWriteAttribute();
            WriteLiteral("\r\n                                       required data-parsley-required-message=\"");
#nullable restore
#line 98 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                                                          Write(ValidationLocalizer["Required"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\"\r\n                                       data-parsley-maxlength=\"2500\" data-parsley-maxlength-message=\"");
#nullable restore
#line 99 "C:\Users\User\source\repos\havhav\HavhavAz\Views\Shared\Components\Comments\Default.cshtml"
                                                                                                Write(ValidationLocalizer["StringLength", "", 2500]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public IHtmlLocalizer<ValidationMessages> ValidationLocalizer { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public IHtmlLocalizer<SharedResource> SharedLocalizer { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public IViewLocalizer Localizer { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<CommentViewModel> Html { get; private set; }
    }
}
#pragma warning restore 1591
