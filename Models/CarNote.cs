using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IndexedDBBlazor.Models
{
    public class CarNote
    {
        public string title { get; set; }
        public string description { get; set; }
        public int typeID { get; set; }
        public double filter { get; set; }
        public DateTime? startDate { get; set; }
    }
    public class ReadCarNote
    {
        public int ID { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int typeID { get; set; }
        public double filter { get; set; }
        public DateTime? startDate { get; set; }
    }
}