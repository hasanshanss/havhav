#pragma checksum "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Shared\Components\Images\Create.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "e0b968da7b71671baa90041cdf214d7f8f4b2a41"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared_Components_Images_Create), @"mvc.1.0.view", @"/Views/Shared/Components/Images/Create.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e0b968da7b71671baa90041cdf214d7f8f4b2a41", @"/Views/Shared/Components/Images/Create.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7d1ba35ab7c6a1f9d84f30df352dba58d5409191", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared_Components_Images_Create : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n<div class=\"row\">\r\n    <div class=\"offset-md-1 offset-lg-2 col-lg-8 col-md-12\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6 text-center\">\r\n                <p class=\"fb-title\">");
#nullable restore
#line 6 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Shared\Components\Images\Create.cshtml"
                               Write(SharedLocalizer["MainPic"]);

#line default
#line hidden
#nullable disable
            WriteLiteral(":</p>\r\n                <div class=\"fb img-box-rounded\">\r\n                    <img alt=\"Azərbaycanda heyvansevərlər üçün ilk və tək sosial şəbəkə\"");
            BeginWriteAttribute("src", " src=", 366, "", 407, 1);
#nullable restore
#line 8 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Shared\Components\Images\Create.cshtml"
WriteAttributeValue("", 371, Url.Content("~/images/beqemot.png"), 371, 36, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(@" id=""main-pic"" class=""fb-img img-autoload"" />
                    <input type=""file"" class=""img-autoload-input"" name=""FormImages.MainImage"" id=""main-pic-input"" style=""display: none;"" />
                </div>
            </div>
            <div class=""col-md-6 text-center"">
                <p class=""fb-title"">");
#nullable restore
#line 13 "C:\Users\User\source\repos\havhav.az\HavhavAz\Views\Shared\Components\Images\Create.cshtml"
                               Write(SharedLocalizer["Gallery"]);

#line default
#line hidden
#nullable disable
            WriteLiteral(@":</p>
                <div class=""row"">
                    <div class=""col-md-3 gallery-img"" id=""gallery-img-1"">
                        <div class=""img-frame clickable"">
                            <i class=""fas fa-plus orange"" style=""margin-top:30px;""></i>
                        </div>
                    </div>
                </div>
                <div class=""gallery-inputs"">
                    <input type=""file"" name=""FormImages.Gallery"" id=""gallery-1"" style=""display: none;"" />
                </div>
            </div>
        </div>
    </div>
</div>

");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591