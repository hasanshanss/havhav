#pragma checksum "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "796d8c678524e452d68f3ba8f95c13b61bd93234"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Account_UserList), @"mvc.1.0.view", @"/Views/Account/UserList.cshtml")]
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
#line 1 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using HavhavAz;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using HavhavAz.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using HavhavAz.Validation;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using static HavhavAz.Helpers.HtmlHelpers.HelperMethods;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using static HavhavAz.Helpers.Utilities;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using static HavhavAz.Helpers.HtmlSanitizer;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using static HavhavAz.Helpers.GeneralExtensions;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using HavhavAz.Helpers.HtmlHelpers.TagHelpers;

#line default
#line hidden
#nullable disable
#nullable restore
#line 11 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using Microsoft.AspNetCore.Mvc.Localization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 12 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using System.Globalization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 13 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using System.IO;

#line default
#line hidden
#nullable disable
#nullable restore
#line 14 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using Microsoft.AspNetCore.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 15 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\_ViewImports.cshtml"
using System.Security.Claims;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
using HavhavAz.Models.UserModels;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
using HavhavAz.Models.ContactsModels;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"796d8c678524e452d68f3ba8f95c13b61bd93234", @"/Views/Account/UserList.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7d1ba35ab7c6a1f9d84f30df352dba58d5409191", @"/Views/_ViewImports.cshtml")]
    public class Views_Account_UserList : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IndexViewModel<User>>
    {
        private global::AspNetCore.Views_Account_UserList.__Generated__ErrorPageViewComponentTagHelper __ErrorPageViewComponentTagHelper;
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/user.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::HavhavAz.Helpers.HtmlHelpers.TagHelpers.PageLinkTagHelper __HavhavAz_Helpers_HtmlHelpers_TagHelpers_PageLinkTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
            DefineSection("Content", async() => {
                WriteLiteral("\r\n");
#nullable restore
#line 7 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
     if (Model.ModelList != null && Model.ModelList.Count > 0)
    {
        

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
         foreach (User user in Model.ModelList)
        {
            

#line default
#line hidden
#nullable disable
#nullable restore
#line 11 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
       Write(Html.DisplayFor(m => user));

#line default
#line hidden
#nullable disable
#nullable restore
#line 11 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
                                       ;
        }

#line default
#line hidden
#nullable disable
                WriteLiteral("        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("page-link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "796d8c678524e452d68f3ba8f95c13b61bd932347242", async() => {
                }
                );
                __HavhavAz_Helpers_HtmlHelpers_TagHelpers_PageLinkTagHelper = CreateTagHelper<global::HavhavAz.Helpers.HtmlHelpers.TagHelpers.PageLinkTagHelper>();
                __tagHelperExecutionContext.Add(__HavhavAz_Helpers_HtmlHelpers_TagHelpers_PageLinkTagHelper);
#nullable restore
#line 13 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
__HavhavAz_Helpers_HtmlHelpers_TagHelpers_PageLinkTagHelper.PageModel = Model.PageViewModel;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("page-model", __HavhavAz_Helpers_HtmlHelpers_TagHelpers_PageLinkTagHelper.PageModel, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                BeginWriteTagHelperAttribute();
                WriteLiteral("/Account/");
#nullable restore
#line 13 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
                                                      WriteLiteral(ViewBag.Url);

#line default
#line hidden
#nullable disable
#nullable restore
#line 13 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
                                                                   WriteLiteral(Context.Request.QueryString.Value);

#line default
#line hidden
#nullable disable
                __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
                __HavhavAz_Helpers_HtmlHelpers_TagHelpers_PageLinkTagHelper.Url = __tagHelperStringValueBuffer;
                __tagHelperExecutionContext.AddTagHelperAttribute("url", __HavhavAz_Helpers_HtmlHelpers_TagHelpers_PageLinkTagHelper.Url, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n");
#nullable restore
#line 14 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
    }
    else
    {

#line default
#line hidden
#nullable disable
                WriteLiteral("        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("vc:error-page", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "796d8c678524e452d68f3ba8f95c13b61bd932349965", async() => {
                }
                );
                __ErrorPageViewComponentTagHelper = CreateTagHelper<global::AspNetCore.Views_Account_UserList.__Generated__ErrorPageViewComponentTagHelper>();
                __tagHelperExecutionContext.Add(__ErrorPageViewComponentTagHelper);
                BeginWriteTagHelperAttribute();
#nullable restore
#line 17 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
                  WriteLiteral(SharedLocalizer[$"NoResult"].Value);

#line default
#line hidden
#nullable disable
                __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
                __ErrorPageViewComponentTagHelper.error = __tagHelperStringValueBuffer;
                __tagHelperExecutionContext.AddTagHelperAttribute("error", __ErrorPageViewComponentTagHelper.error, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n");
#nullable restore
#line 18 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
    }

#line default
#line hidden
#nullable disable
            }
            );
            WriteLiteral("\r\n");
            DefineSection("addJs", async() => {
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "796d8c678524e452d68f3ba8f95c13b61bd9323411894", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    <script>\r\n        isAuthenticated = \"");
#nullable restore
#line 24 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Account\UserList.cshtml"
                      Write(User.Identity.IsAuthenticated.ToString().ToLower());

#line default
#line hidden
#nullable disable
                WriteLiteral("\" === \'true\';\r\n    </script>\r\n");
            }
            );
            WriteLiteral("\r\n\r\n");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IndexViewModel<User>> Html { get; private set; }
        [Microsoft.AspNetCore.Razor.TagHelpers.HtmlTargetElementAttribute("vc:error-page")]
        public class __Generated__ErrorPageViewComponentTagHelper : Microsoft.AspNetCore.Razor.TagHelpers.TagHelper
        {
            private readonly global::Microsoft.AspNetCore.Mvc.IViewComponentHelper __helper = null;
            public __Generated__ErrorPageViewComponentTagHelper(global::Microsoft.AspNetCore.Mvc.IViewComponentHelper helper)
            {
                __helper = helper;
            }
            [Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeNotBoundAttribute, global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewContextAttribute]
            public global::Microsoft.AspNetCore.Mvc.Rendering.ViewContext ViewContext { get; set; }
            public System.String error { get; set; }
            public override async global::System.Threading.Tasks.Task ProcessAsync(Microsoft.AspNetCore.Razor.TagHelpers.TagHelperContext __context, Microsoft.AspNetCore.Razor.TagHelpers.TagHelperOutput __output)
            {
                (__helper as global::Microsoft.AspNetCore.Mvc.ViewFeatures.IViewContextAware)?.Contextualize(ViewContext);
                var __helperContent = await __helper.InvokeAsync("ErrorPage", new { error });
                __output.TagName = null;
                __output.Content.SetHtmlContent(__helperContent);
            }
        }
    }
}
#pragma warning restore 1591
