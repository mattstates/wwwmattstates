using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System;
using mattstates.Configuration;

namespace mattstates.Controllers
{
    [Route("api/[controller]")]
    public class TwitterController : Controller
    {
        private const string OAUTH_SIGNATURE_METHOD = "HMAC-SHA1";
        private const string OAUTH_VERSION = "1.0";
        private const string TWITTER_BASE_PATH = "https://api.twitter.com/1.1/";
        private readonly IHttpClientFactory _clientFactory;
        private readonly string _accessToken;
        private readonly string _accessTokenSecret;
        private readonly string _consumerKey;
        private readonly string _consumerKeySecret;
        private static DateTime LastRequest;
        private static string CachedTweets;

        public TwitterController(IHttpClientFactory clientFactory, IOptions<TwitterConfig> config)
        {
            _clientFactory = clientFactory;

            _accessToken = config.Value.AccessToken;
            _accessTokenSecret = config.Value.AccessSecret;
            _consumerKey = config.Value.Api;
            _consumerKeySecret = config.Value.ApiSecret;
        }

        private async Task<IActionResult> GetResponse(string url, HttpMethod method, SortedDictionary<string, string> parameters)
        {
            var httpClient = _clientFactory.CreateClient();
            var uri = new Uri(url);
            var request = new HttpRequestMessage(method, uri);

            var authHeader = CreateHeader(uri.GetLeftPart(UriPartial.Path), method, parameters);

            request.Headers.Add("Authorization", authHeader);

            var response = await httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                CachedTweets = await response.Content.ReadAsStringAsync();
                LastRequest = DateTime.Now;
                
                return Ok(CachedTweets);
            }

            return BadRequest(response.StatusCode);

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Tweets()
        {

            if(LastRequest.AddMinutes(5) < DateTime.UtcNow && !String.IsNullOrEmpty(CachedTweets))
            {
                return Ok(CachedTweets);
            }

            var requestParameters = new SortedDictionary<string, string>();

            requestParameters.Add("count", "3");
            var response = await GetResponse($"{TWITTER_BASE_PATH}statuses/user_timeline.json?{requestParameters.ToWebString()}", HttpMethod.Get, requestParameters);

            return response;
        }

        private string CreateHeader(string url, HttpMethod method, SortedDictionary<string, string> parameters)
        {
            var oauthNonce = Convert.ToBase64String(new ASCIIEncoding().GetBytes(DateTime.Now.Ticks.ToString()));
            var oauthTimestamp = CreateOAuthTimestamp();
            var oauthSignature = CreateOauthSignature(url, method, oauthNonce, oauthTimestamp, parameters);

            var consumerKey = $"oauth_consumer_key=\"{Uri.EscapeDataString(_consumerKey)}\"";
            var nonce = $"oauth_nonce=\"{Uri.EscapeDataString(oauthNonce)}\"";
            var signature = $"oauth_signature=\"{Uri.EscapeDataString(oauthSignature)}\"";
            var signatureMethod = $"oauth_signature_method=\"{Uri.EscapeDataString(OAUTH_SIGNATURE_METHOD)}\"";
            var timestamp = $"oauth_timestamp=\"{Uri.EscapeDataString(oauthTimestamp)}\"";
            var token = $"oauth_token=\"{Uri.EscapeDataString(_accessToken)}\"";
            var version = $"oauth_version=\"{Uri.EscapeDataString(OAUTH_VERSION)}\"";

            return $"OAuth {consumerKey}, {nonce}, {signature}, {signatureMethod}, {timestamp}, {token}, {version}";
        }

        private string CreateOauthSignature(string url, HttpMethod method, string nonce, string timestamp, SortedDictionary<string, string> parameters)
        {
            // Add the standard oauth parameters to the sorted list
            parameters.Add("oauth_consumer_key", _consumerKey);
            parameters.Add("oauth_nonce", nonce);
            parameters.Add("oauth_signature_method", OAUTH_SIGNATURE_METHOD);
            parameters.Add("oauth_timestamp", timestamp);
            parameters.Add("oauth_token", _accessToken);
            parameters.Add("oauth_version", OAUTH_VERSION);

            var signatureBaseString = $"{method.ToString()}&{Uri.EscapeDataString(url)}&{Uri.EscapeDataString(parameters.ToWebString().ToString())}";

            // Using this base string, we then encrypt the data using a composite of the secret keys and the HMAC-SHA1 algorithm.
            var compositeKey = $"{Uri.EscapeDataString(_consumerKeySecret)}&{Uri.EscapeDataString(_accessTokenSecret)}";

            string oauthSignature;

            using (var hasher = new HMACSHA1(Encoding.ASCII.GetBytes(compositeKey)))
            {
                oauthSignature = Convert.ToBase64String(hasher.ComputeHash(Encoding.ASCII.GetBytes(signatureBaseString)));
            }

            return oauthSignature;
        }

        private string CreateOAuthTimestamp()
        {
            var timespan = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            var timestamp = Convert.ToInt64(timespan.TotalSeconds).ToString();

            return timestamp;
        }

    }
}

public static class Extensions
{
    public static string ToWebString(this SortedDictionary<string, string> source)
    {
        var body = new StringBuilder();

        foreach (var requestParameter in source)
        {
            body.Append(requestParameter.Key);
            body.Append("=");
            body.Append(Uri.EscapeDataString(requestParameter.Value));
            body.Append("&");
        }
        //remove trailing '&'
        body.Remove(body.Length - 1, 1);

        return body.ToString();
    }
}