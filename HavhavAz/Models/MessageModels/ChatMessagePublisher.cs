using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.MessageModels
{
    public class ChatMessagePublisher
    {
        public string Content { get; set; }
        public string Publisher { get; set; }
        public DateTime Date { get; set; }
        public string ImagePath { get; set; }
        public ChatMessagePublisher()
        {
            Date = DateTime.Now.AddHours(11);    
        }
    }
}
