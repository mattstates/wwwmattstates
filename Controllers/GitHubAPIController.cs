using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace mattstates.Controllers
{
    [Route("api/[controller]")]
    public class GitHubAPIController : Controller
    {
        private const string GITHUB_URL = "https://api.github.com/users/mattstates/events";

        [HttpGet("[action]")]
        public JsonResult GitHubEvents()
        {
            var testEvent = new GitHubEvent()
            {
                DateFormatted = new DateTime().ToShortDateString(),
                Repository = new Repository() { Name = "Test Repo", URL = "www.something.com" },
                Type = "TestEventType"
            };
            var response = new List<GitHubEvent>();
            response.Add(testEvent);
            return Json(response);
        }

        public class GitHubEvent
        {
            public string DateFormatted { get; set; }
            public Repository Repository { get; set; }
            public string Type { get; set; }

        }

        public class Repository
        {
            public string Name { get; set; }
            public string URL { get; set; }
        }
    }
}
