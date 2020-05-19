using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Models
{
    public class IndexViewModel<T>
    {
        public PageViewModel PageViewModel {get;set;}
        public byte SelectedState { get; set; }
        public IList<T> ModelList { get; set; }
    }
}
