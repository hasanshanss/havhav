using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.ImageModels
{
    public class ImageViewModel 
    {
        public string Filename { get; set; }
        public string Path { get; set; }
        public string[] DeletedImages { get; set; }
        public IFormFile MainImage { get; set; }
        public List<IFormFile> Gallery { get; set; }
    }
}
