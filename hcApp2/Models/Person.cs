using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hcApp2.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StreetAddress { get; set; }
        public int Age { get; set; }
        public string Interests { get; set; }
        public string PictureURL { get; set; }
    }
}
