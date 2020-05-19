using HavhavAz.Models.ImageModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.CharityModels
{
    public class ReceiptViewModel
    {
        public IList<Receipt> Receipts { get; set; }
        public ICollection<SelectListItem> CharitySelectList { get; set; }
        public ICollection<SelectListItem> ReceiptStatusSelectList { get; set; }

        //public IFormFile Image { get; set; }

        public ReceiptViewModel()
        {
            Receipts = new List<Receipt>();
        }
    }
}
