using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hcApp2.Models;

namespace hcApp2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly int delay = 3000;
        private readonly PersonInfoContext _context;
       public PersonsController(PersonInfoContext context)
        {
            _context = context;

            if (_context.Persons.Count() == 0)
            {
                _context.Persons.Add(new Person() { Id = 1, FirstName = "Fred", LastName="Fredericson",  Age = 41, StreetAddress = "123 SomeStreet", Interests = "Portlandia, WakeBoarding", PictureURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Fred_Armisen_2014_cropped_and_retouched.jpg/220px-Fred_Armisen_2014_cropped_and_retouched.jpg" });
                _context.Persons.Add(new Person() { Id = 2, FirstName = "Jane", LastName ="Johnson", Age = 33, StreetAddress = "124 SomeAvenue", Interests = "Hiking, Rafting", PictureURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/JaneAsher.jpg/200px-JaneAsher.jpg" });
                _context.Persons.Add(new Person() { Id = 3, FirstName = "Nancy", LastName= "Smith", Age = 39, StreetAddress = "124 NewStreet", Interests = "Social Media", PictureURL = "http://nancycampbell.co.uk/wp-content/uploads/Screen-Shot-2018-04-19-at-20.27.41-475x600.png" });
                _context.SaveChanges();
            }
        }
       
        [HttpGet("{name:alpha}")]
        public async Task<ActionResult<IEnumerable<Person>>> Get( string name)
        {
            await Task.Delay(delay);
            return await _context.Persons.Where(x=> x.FirstName.Contains(name, StringComparison.CurrentCultureIgnoreCase) || x.LastName.Contains(name, StringComparison.CurrentCultureIgnoreCase)). ToListAsync();
        }

        // GET api/persons/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Person>> Get(int id)
        {
            return await _context.Persons.FindAsync(id);
            
        }

        // GET api/persons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> Get()
        {
            return await _context.Persons.ToListAsync();
        }


        // POST api/persons
        [HttpPost]
        public async Task<ActionResult<Person>> Post([FromBody] Person person)
        {
            
            person.Id = _context.Persons.OrderBy(x =>x.Id).Last().Id + 1;
            await _context.AddAsync(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Person), new { id = person.Id }, person);
        }

        // PUT api/persons/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Person value)
        {
            if (id != value.Id)
                return BadRequest();

            var person = _context.Entry(value);
            person.State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            
            var p  = await  _context.Persons.FindAsync(id);
            if (null == p)
                return NotFound();
            _context.Persons.Remove(p);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
