using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;



namespace hcApp2.Models
{
    public class PersonInfoContext : DbContext
    {
        public PersonInfoContext(DbContextOptions<PersonInfoContext> options)
            : base(options)
        {
        }

        public DbSet<Person> Persons{ get; set; }
    }
}
