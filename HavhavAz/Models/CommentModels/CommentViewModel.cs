using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models.CommentModels
{
    public class CommentViewModel
    {
        public IList<CommentPublisher> CommentPublisherList { get; set; }
        public bool HasNext { get; set; }
    }
}
