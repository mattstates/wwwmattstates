using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using WebUI.Code;
using mattstates.Configuration;

namespace mattstates.Controllers
{
    [Route("api/[controller]")]
    public class TwitterController : Controller
    {
        private const string TWITTER_URL = "";
        private readonly IHttpClientFactory _clientFactory;
        private static DateTime LastRequest;
        private static String CachedTwitterResponse;
        private readonly TwitterConfig _configuration;
        private TwitterClient twitterClient;
        public TwitterController(IHttpClientFactory clientFactory, IOptions<TwitterConfig> config)
        {
            _clientFactory = clientFactory;
            _configuration = config.Value;
            twitterClient = new TwitterClient(config.Value.Api, config.Value.ApiSecret, config.Value.AccessToken, config.Value.AccessSecret);
        }

        // [HttpGet("[action]")]
        // public async Task<IActionResult> Twitter()
        // {
        //     if(LastRequest.AddMinutes(1) > DateTime.UtcNow && !String.IsNullOrEmpty(CachedTwitterResponse))
        //     {
        //         return Ok(CachedTwitterResponse);
        //     }

        //     var httpClient = _clientFactory.CreateClient();
        //     var request = new HttpRequestMessage(HttpMethod.Get, TWITTER_URL);

        //     request.Headers.Add("Accept", "application/vnd.github.v3+json");
        //     request.Headers.Add("User-Agent", "mattstates");

        //     var response = await httpClient.SendAsync(request);
        //     var json = await response.Content.ReadAsStringAsync();

        //     if(response.IsSuccessStatusCode)
        //     {
        //         CachedTwitterResponse = await response.Content.ReadAsStringAsync();
        //         LastRequest = DateTime.Now;
        //         return Ok(CachedTwitterResponse);
        //     }

        //     return BadRequest();
        // }
        
        [HttpGet("[action]")]
        public string Test()
        {
            var response = twitterClient.GetTweets("mattstates", 5);
            return response;
        }
    }
}
