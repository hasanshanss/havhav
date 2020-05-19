using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.CharityModels
{
    public class ReceiptDTO
    {
        [StringLength(20, ErrorMessage = "StringLength")]
        public string Name { set; get; }

        [Required(ErrorMessage = "Required")]
        public int Amount { set; get; }

        [Required(ErrorMessage = "Required")]
        public string CharityId { get; set; }

        [Required(ErrorMessage = "Required")]
        public IFormFile Image { get; set; }
    }
}
