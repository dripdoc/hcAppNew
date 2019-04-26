using System;
using Xunit;
using hcApp2.Controllers;
using hcApp2.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections;
using System.Net.Http;
using System.Text;

namespace WebapiTest
{
    public class TestPersonController : IClassFixture<WebApplicationFactory<hcApp2.Startup>>
    {
        private readonly WebApplicationFactory<hcApp2.Startup> _factory;

        public TestPersonController(WebApplicationFactory<hcApp2.Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task AssertDefaultResults()
        {
            var client = _factory.CreateClient();
            var r = await client.GetAsync("/api/persons");

            r.EnsureSuccessStatusCode();

            var content = await r.Content.ReadAsStringAsync();
            var objects = JsonConvert.DeserializeObject(content) as IList;

            Assert.Equal(3, objects.Count);

        }


        [Fact]
        public async Task AssertAdd()
        {
            //Add a new person
            var client = _factory.CreateClient();
            var testPerson = new Person() { Id = 3, FirstName = "Nancy", LastName = "Smith", Age = 39, StreetAddress = "124 NewStreet", Interests = "Social Media", PictureURL = "JanePic.jpg" };
            string json = JsonConvert.SerializeObject(testPerson);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            await client.PostAsync("/api/persons/", httpContent);

            //
            var r = await client.GetAsync("/api/persons");
            r.EnsureSuccessStatusCode();
            var content = await r.Content.ReadAsStringAsync();
            var objects = JsonConvert.DeserializeObject(content) as IList;

            Assert.Equal(4, objects.Count);

        }

        public static TheoryData<string, int> SearchData =>
        new TheoryData<string, int>
        {
            { "api/persons/Notfound",0 },
            { "api/persons/Nan",1 },
            { "api/persons/frederi",1 },
            { "api/persons/fred",1 },
            { "api/persons/Johnson",1 },
            { "api/persons/son",2 },
 
        };

        [Theory]
        [MemberData(nameof(SearchData))]
        public async Task AssertSearchResults(string testvalue, int expectedCount)
        {
            var client = _factory.CreateClient();
            var r = await client.GetAsync(testvalue);

            r.EnsureSuccessStatusCode();

            var content = await r.Content.ReadAsStringAsync();
            var objects = JsonConvert.DeserializeObject(content) as IList;

            Assert.Equal(expectedCount, objects.Count);

        }

    }
}
