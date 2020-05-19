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

        public static IList<SelectListItem> GenerateLanguageSelectList(IList<Culture> existedCultures, bool nonFilter = true)
        {
            return Enum.GetValues(typeof(Culture)).Cast<Culture>()
                                                  .Select(c => 
                    new SelectListItem
                    {
                        Value = ((byte)c).ToString(),
                        Text = c.ToString()
                    })
                    .Where(m => !nonFilter || !existedCultures.Contains((Culture) Enum.Parse(typeof(Culture), m.Text)) 
                                && !m.Text.Equals("Neutral"))
                    .ToList();
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
            const string fromPassword = "s@2510209630p";

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

      

    }
}