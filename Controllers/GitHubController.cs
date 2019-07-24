using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System;

namespace mattstates.Controllers
{
    [Route("api/[controller]")]
    public class GitHubController : Controller
    {
        private const string GITHUB_URL = "https://api.github.com/users/mattstates/events";
        private readonly IHttpClientFactory _clientFactory;
        private static DateTime LastRequest;
        private static String CachedGitHubEvents;

        public GitHubController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GitHubEvents()
        {
            if(LastRequest.AddMinutes(1) > DateTime.UtcNow && !String.IsNullOrEmpty(CachedGitHubEvents))
            {
                return Ok(CachedGitHubEvents);
            }

            var httpClient = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Get, GITHUB_URL);

            request.Headers.Add("Accept", "application/vnd.github.v3+json");
            request.Headers.Add("User-Agent", "mattstates");

            var response = await httpClient.SendAsync(request);
            var json = await response.Content.ReadAsStringAsync();

            if(response.IsSuccessStatusCode)
            {
                CachedGitHubEvents = await response.Content.ReadAsStringAsync();
                LastRequest = DateTime.Now;
 
                return Ok(CachedGitHubEvents);
            }

            return BadRequest();
        }
    }
}
