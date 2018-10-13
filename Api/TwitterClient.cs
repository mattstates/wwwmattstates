using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System;

// Adapted from: https://www.codeproject.com/Articles/1200390/Taming-the-Twitter-API-in-Csharp
namespace WebUI.Code
{
    public class TwitterClient
    {
        public const string OAUTH_VERSION = "1.0";
        public const string OAUTH_SIGNATURE_METHOD = "HMAC-SHA1";
        public const string BASE_TWITTER_PATH = "https://api.twitter.com/1.1/statuses/";
        private string _consumerKey;
        private string _consumerKeySecret;
        private string _accessToken;
        private string _accessTokenSecret;

        public TwitterClient(string consumerKey, string consumerKeySecret, string accessToken, string accessTokenSecret)
        {
            _consumerKey = consumerKey;
            _consumerKeySecret = consumerKeySecret;
            _accessToken = accessToken;
            _accessTokenSecret = accessTokenSecret;
        }

        // public string GetMentions(int count)
        // {
        //     string resourceUrl =
        //         string.Format("http://api.twitter.com/1/statuses/mentions.json");

        //     var requestParameters = new SortedDictionary<string, string>();
        //     requestParameters.Add("count", count.ToString());
        //     requestParameters.Add("include_entities", "true");

        //     var response = GetResponse(resourceUrl, Method.GET, requestParameters);

        //     return response;
        // }

        public string GetTweets(string screenName, int count)
        {
            var requestParameters = new SortedDictionary<string, string>();
            requestParameters.Add("count", count.ToString());
            requestParameters.Add("screen_name", screenName);

            var response = GetResponse($"{BASE_TWITTER_PATH}user_timeline.json", Method.GET, requestParameters);

            return response;
        }

        // public string PostStatusUpdate(string status, double latitude, double longitude)
        // {
        //     const string resourceUrl = "http://api.twitter.com/1/statuses/update.json";

        //     var requestParameters = new SortedDictionary<string, string>();
        //     requestParameters.Add("status", status);
        //     requestParameters.Add("lat", latitude.ToString());
        //     requestParameters.Add("long", longitude.ToString());

        //     return GetResponse(resourceUrl, Method.POST, requestParameters);
        // }

        // private string GetResponse
        // (string resourceUrl, Method method, SortedDictionary<string, string> requestParameters)
        // {
        //     ServicePointManager.Expect100Continue = false;
        //     WebRequest request = null;
        //     string resultString = string.Empty;

        //     if (method == Method.POST)
        //     {
        //         var postBody = requestParameters.ToWebString();

        //         request = (HttpWebRequest)WebRequest.Create(resourceUrl);
        //         request.Method = method.ToString();
        //         request.ContentType = "application/x-www-form-urlencoded";

        //         using (var stream = request.GetRequestStream())
        //         {
        //             byte[] content = Encoding.ASCII.GetBytes(postBody);
        //             stream.Write(content, 0, content.Length);
        //         }
        //     }
        //     else if (method == Method.GET)
        //     {
        //         request = (HttpWebRequest)WebRequest.Create(resourceUrl + "?"
        //             + requestParameters.ToWebString());
        //         request.Method = method.ToString();
        //     }
        //     else
        //     {
        //         //other verbs can be addressed here...
        //     }

        //     if (request != null)
        //     {
        //         var authHeader = CreateHeader(resourceUrl, method, requestParameters);
        //         request.Headers.Add("Authorization", authHeader);
        //         var response = request.GetResponse();

        //         using (var sd = new StreamReader(response.GetResponseStream()))
        //         {
        //             resultString = sd.ReadToEnd();
        //             response.Close();
        //         }
        //     }

        //     return resultString;
        // }

        private string GetResponse(string url, Method method, SortedDictionary<string, string> parameters)
        {
            ServicePointManager.Expect100Continue = false;
            WebRequest request = null;
            string resultString = string.Empty;

            if (method == Method.POST)
            {
                var postBody = parameters.ToWebString();

                request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = method.ToString();
                request.ContentType = "application/x-www-form-urlencoded";

                using (var stream = request.GetRequestStream())
                {
                    byte[] content = Encoding.ASCII.GetBytes(postBody);
                    stream.Write(content, 0, content.Length);
                }
            }
            else if (method == Method.GET)
            {
                request = (HttpWebRequest)WebRequest.Create(url + "?"
                    + parameters.ToWebString());
                request.Method = method.ToString();
            }
            else
            {
                //other verbs can be addressed here...
            }

            if (request != null)
            {
                var authHeader = CreateHeader(url, method, parameters);
                request.Headers.Add("Authorization", authHeader);
                var response = request.GetResponse();

                using (var sd = new StreamReader(response.GetResponseStream()))
                {
                    resultString = sd.ReadToEnd();
                    response.Close();
                }
            }

            return resultString;
        }

        private static string CreateOauthNonce()
        {
            return Convert.ToBase64String(new ASCIIEncoding().GetBytes(DateTime.Now.Ticks.ToString()));
        }

        private string CreateHeader(string url, Method method, SortedDictionary<string, string> parameters)
        {
            var oauthNonce = CreateOauthNonce();
            // Convert.ToBase64String(new ASCIIEncoding().GetBytes(DateTime.Now.Ticks.ToString()));
            var oauthTimestamp = CreateOAuthTimestamp();
            var oauthSignature = CreateOauthSignature(url, method, oauthNonce, oauthTimestamp, parameters);

            //The oAuth signature is then used to generate the Authentication header. 
            const string headerFormat = "OAuth oauth_nonce=\"{0}\", " +
                                        "oauth_signature_method=\"{1}\", " +
                                        "oauth_timestamp=\"{2}\", " +
                                        "oauth_consumer_key=\"{3}\", " +
                                        "oauth_token=\"{4}\", " +
                                        "oauth_signature=\"{5}\", " +
                                        "oauth_version=\"{6}\"";

            var authHeader = string.Format(headerFormat,
                                           Uri.EscapeDataString(oauthNonce),
                                           Uri.EscapeDataString(OAUTH_SIGNATURE_METHOD),
                                           Uri.EscapeDataString(oauthTimestamp),
                                           Uri.EscapeDataString(_consumerKey),
                                           Uri.EscapeDataString(_accessToken),
                                           Uri.EscapeDataString(oauthSignature),
                                           Uri.EscapeDataString(OAUTH_VERSION));

            return authHeader;
        }

        private string CreateOauthSignature(string url, Method method, string nonce, string timestamp, SortedDictionary<string, string> parameters)
        {
            //firstly we need to add the standard oauth parameters to the sorted list
            parameters.Add("oauth_consumer_key", _consumerKey);
            parameters.Add("oauth_nonce", nonce);
            parameters.Add("oauth_signature_method", OAUTH_SIGNATURE_METHOD);
            parameters.Add("oauth_timestamp", timestamp);
            parameters.Add("oauth_token", _accessToken);
            parameters.Add("oauth_version", OAUTH_VERSION);

            var sigBaseString = parameters.ToWebString();

            var signatureBaseString = $"{method.ToString()}&{Uri.EscapeDataString(url)}&{Uri.EscapeDataString(sigBaseString.ToString())}";

            //Using this base string, we then encrypt the data using a composite of the secret keys and the HMAC-SHA1 algorithm.
            var compositeKey = $"{Uri.EscapeDataString(_consumerKeySecret)}&{Uri.EscapeDataString(_accessTokenSecret)}";

            string oauthSignature;
            using (var hasher = new HMACSHA1(Encoding.ASCII.GetBytes(compositeKey)))
            {
                oauthSignature = Convert.ToBase64String(hasher.ComputeHash(Encoding.ASCII.GetBytes(signatureBaseString)));
            }

            return oauthSignature;
        }

        private static string CreateOAuthTimestamp()
        {
            var nowUtc = DateTime.UtcNow;
            var timeSpan = nowUtc - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            var timestamp = Convert.ToInt64(timeSpan.TotalSeconds).ToString();

            return timestamp;
        }
    }

    public enum Method
    {
        POST,
        GET
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
}