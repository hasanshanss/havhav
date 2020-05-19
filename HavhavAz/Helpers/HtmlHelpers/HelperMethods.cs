using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HavhavAz.Helpers.HtmlHelpers
{
    public static class HelperMethods
    {
        public static HtmlString ListImages(this IHtmlHelper html,
                                            string path,
                                            byte size = 1,
                                            bool isEditable = false)
        {
            
            return new HtmlString(ListImagesAjax(path, size, isEditable));
        }

        public static string ListImagesAjax(string path,
                                            byte size = 1,
                                            bool isEditable = false)
        {
            StringBuilder result = new StringBuilder("<div class='row gallery'>");
            result.Append($"<div class='row' style='width:625px;'>");
            string directoryPath = $"wwwroot/images/{path}";

            if (!Directory.Exists(directoryPath))
                return "";

            foreach (var img in Directory.GetFiles(directoryPath))
            {
                string filename = System.IO.Path.GetFileName(img);
                string extension = System.IO.Path.GetExtension(filename).Substring(1);

                string url = $"/images/{path}/{filename}";

                result.Append($"<div class='col-md-{size + 1} img-box-{size} clickable' id='{filename}'>");
                result.Append((isEditable ? "<span class='img-remove-btn'>&times;</span>" : ""));
                result.Append($"<a href={url} class='html5lightbox' data-group='mygroup'>");

                if (extension.Equals("jpg", StringComparison.OrdinalIgnoreCase))
                    result.Append($"<img alt='Azərbaycanda heyvansevərlər üçün ilk və tək sosial şəbəkə' src={url} class='cb-img-thumb'>");
                else
                {
                    result.Append($"<video class='cb-img-thumb' muted autoplay loop>");
                    result.Append($"<source src={url} type='video/mp4'>");
                    result.Append("</video>");
                }

                result.Append("</a></div>");
            }

            if (isEditable)
            {
                result.Append("<div class='col-md-3 gallery-img' id='gallery-img-1'>");
                result.Append("<div class='img-frame clickable'>");
                result.Append("<i class='fas fa-plus orange' style='margin-top:30px;'></i>");
                result.Append("</div></div>");
            }

            result.Append("</div></div>");
            return result.ToString();
        }
    }
}
