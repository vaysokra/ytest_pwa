using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IndexedDBBlazor.Models
{
    public class Person
    {
        public string Salutation { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        public List<KeyValuePair<string, string>> PhoneNumbers { get; set; }
        public Person()
        {
            PhoneNumbers = new List<KeyValuePair<string, string>>();
        }
    }
}