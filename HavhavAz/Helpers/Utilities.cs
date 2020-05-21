using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using HavhavAz.Models;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using HavhavAz.Models.ImageModels;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Html;
using System.Linq.Expressions;
using Microsoft.Extensions.Localization;
using System.Net.Mail;
using System.Net;
using HavhavAz.Models.MessageModels;
using System.Text;
using HavhavAz.Services.LoggerService;

namespace HavhavAz.Helpers
{
    public static class Utilities
    {
        public static Queue<ChatMessagePublisher> _cmpList;
        public static IList<SelectListItem> _stateSelectList = GenerateStateSelectList();
        public static IList<SelectListItem> _stateSelectListUser = GenerateStateSelectList(false);
        public static IList<SelectListItem> _languageSelectList = GenerateLanguageSelectList();
        public static State[] _userAccessibleStateList = GetUserAccessibleStateList();
        
        public static string UploadOneImage(IFormFile imageFile, 
                                            string path, 
                                            string filename = null, 
                                            bool isMainImage = false)
        {
            path = Path.Combine("wwwroot\\images", path);

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            
            if (imageFile != null && imageFile.Length > 0)
            {
                filename += Path.GetExtension(imageFile.FileName).ToLower();
                path = Path.Combine(path, filename);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    imageFile.CopyTo(stream);
                }
            }

            return filename;
        }

        public static string GetMainPic(string modelName, string filename, string folder = "")
        {
            string filePath = $"{modelName}\\{folder}\\{filename}.jpg";
            return File.Exists($"wwwroot\\images\\{filePath}") 
                   ? filePath 
                   : $"{modelName}\\Anonym.jpg";
        }

        public static void DeleteMedia(string fileName, string path)
        {
            path = Path.Combine("wwwroot\\images", path);
            File.Delete(Path.Combine(path, fileName));
        }

        public static void UpdatePostImages(ImageViewModel ivm)
        {
            string path = Path.Combine(ivm.Path, ivm.Filename);

            if (ivm.DeletedImages != null)
            {
                foreach (string image in ivm.DeletedImages)
                    DeleteMedia(image, path);
            }

            UploadOneImage(ivm.MainImage, path, ivm.Filename);

            if (ivm.Gallery != null)
            {
                for(int i = 0; i < ivm.Gallery.Count; i++)
                {
                    UploadOneImage(ivm.Gallery[i], path, $"{ivm.Filename}_{(i+1)}");
                }
            }

            
        }

        public static void DeleteFolder(string path)
        {
            path = Path.Combine("wwwroot\\images", path);
            var dir = new DirectoryInfo(path);
            if (dir.Exists)
            {
                dir.Delete(true);
            }
        }


        public static string ValidateImageList(ImageViewModel ivm)
        {
            if (ivm == null)
                return null;

            string error = String.Empty;

            if (ivm.MainImage != null)
            {
                error = ValidateImage(ivm.MainImage);
            }
            
            if (String.IsNullOrEmpty(error))
            {
                if(ivm.Gallery != null)
                {
                    foreach (IFormFile image in ivm.Gallery)
                    {
                        error = ValidateImage(image, true);
                        if (error != null)
                            break;
                    }
                }
            }

            return error;
        }

        public static string ValidateImage(IFormFile imageFile, bool isGallery = false)
        {
            string errorMessage = null;
            

            if (imageFile != null)
            {
                //var supportedTypes = new[] { "jpg", "jpeg", "png", "mp4" };
                var supportedTypes = new[] { "jpg", "mp4" };
                var extension = System.IO.Path.GetExtension(imageFile.FileName).Substring(1);

                bool isVideo = extension.Equals("mp4", StringComparison.OrdinalIgnoreCase);
                var sizeLimit = isVideo ? 2000 * 10000 : 2000 * 1000;

                if (!supportedTypes.Contains(extension, StringComparison.OrdinalIgnoreCase))
                {
                    errorMessage = $"ImagesValidation{(isGallery ? "MainPic" : "Gallery")}Extension";

                } else if (imageFile.Length > sizeLimit)
                {
                    errorMessage = $"ImagesValidation{(isVideo ? "Video" : "Image" )}Size";
                }


            }

            return errorMessage;
        }

        public static string Slugify(string title)
        {
            return title.ToLower().Replace(" ", "-");
        }

        public static Int32 ParseId(string slug)
        {
            int startIndex = slug.IndexOf('_');
            Int32.TryParse(slug.Substring(startIndex + 1), out Int32 ID);
            return ID;
        }

        public static IList<SelectListItem> GenerateLanguageSelectList()
        {
            return Enum.GetValues(typeof(Culture)).Cast<Culture>()
                                                  .Select(c =>
                    new SelectListItem
                    {
                        Value = ((byte)c).ToString(),
                        Text = c.ToString()
                    }).Where(m => !m.Text.Equals("Neutral"))
                    .ToList();
        }

        public static IList<SelectListItem> GenerateLanguageSelectList(IList<Culture> existedCultures, bool filter = true)
        {
            IList<Culture> cultures = filter ? Enum.GetValues(typeof(Culture)).Cast<Culture>().ToList() : existedCultures;
            Expression<Func<SelectListItem, bool>> lambda = m => !existedCultures.Contains((Culture)Enum.Parse(typeof(Culture), m.Text)) &&
                                                           !m.Text.Equals("Neutral");

            IQueryable<SelectListItem> query =  cultures.Select(c =>
                new SelectListItem
                {
                    Value = ((byte)c).ToString(),
                    Text = c.ToString()
                }).AsQueryable();

            if (filter)
                query = query.Where(lambda);

            return query.ToList();
        }

        public static IList<SelectListItem> GenerateStateSelectList(bool isAdmin = true)
        {
            
            if (isAdmin)
            {
                return Enum.GetValues(typeof(State)).Cast<State>()
                                                  .Select(c =>
                    new SelectListItem
                    {
                        Value = ((byte)c).ToString(),
                        Text = c.ToString()
                    })
                    .ToList();
            }
            else
            {
                SelectListItem approved = new SelectListItem
                {
                    Value = "1",
                    Text = "Approved"
                };

                SelectListItem pending = new SelectListItem
                {
                    Value = "2",
                    Text = "Pending"

                };

                return new SelectListItem[] { approved, pending };

            }
        }

        public static void SendEmail(string toEmail,
                                     string toName,
                                     string subject,
                                     string body)
        {
            var fromAddress = new MailAddress("support@havhav.az", "Havhav.az");
            var toAddress = new MailAddress(toEmail, toName);
            const string fromPassword = "";

            var smtp = new SmtpClient
            {
                Host = "mail.havhav.az",
                Port = 587,
                //EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
            {
                smtp.Send(message);
            }
        }

        public static string GenerateLogMessage(LogActionInfo lai)
        {
            StringBuilder message = new StringBuilder();

            message.AppendLine();
            message.Append($"Ip: {lai.Ip}");
            message.AppendLine();
            message.Append($"UserId: {lai.UserId}");
            message.AppendLine();
            message.Append($"Action: {lai.LogActionType.ToString()}");
            message.AppendLine();
            message.Append($"Message: {lai.Message.ToString()}");

            return message.ToString();
        }

        public static State[] GetUserAccessibleStateList()
        {
            return new[]
            {
                State.Finished,
                State.Canceled,
                State.Deleted,
                State.Approved
            };
        }

        public static string ListImagesAjax(string path,
                                           byte size = 1,
                                           bool isEditable = false)
        {
            StringBuilder result = new StringBuilder("<div class='row gallery'>");
            result.Append($"<div class='row' style='width:625px;'>");
            string directoryPath = $"wwwroot/images/{path}";

            if (Directory.Exists(directoryPath))
            {
                foreach (var img in Directory.GetFiles(directoryPath))
                {
                    string filename = System.IO.Path.GetFileName(img);
                    string extension = System.IO.Path.GetExtension(filename).Substring(1);

                    string url = $"/images/{path}/{filename}";

                    result.Append($"<div class='col-md-{size + 1} img-box-{size} clickable' id='{filename}'>");
                    result.Append((isEditable ? "<span class='img-remove-btn'>&times;</span>" : ""));
                    result.Append($"<a href={url} class='html5lightbox' data-group='mygroup'>");

                    
                    if (extension.Equals("jpg", StringComparison.OrdinalIgnoreCase))
                        result.Append($"<img src={url} class='cb-img-thumb'>");
                    else
                    {
                        result.Append($"<video class='cb-img-thumb' muted autoplay loop>");
                        result.Append($"<source src={url} type='video/mp4'>");
                        result.Append("</video>");
                    }

                    result.Append("</a></div>");
                }
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