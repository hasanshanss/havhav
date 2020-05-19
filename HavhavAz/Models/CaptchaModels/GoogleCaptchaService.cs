using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HavhavAz.Models.CaptchaModels
{
    public class GoogleCaptchaService
    {

        private ReCAPTCHASettings _settings;

        public GoogleCaptchaService(IOptions<ReCAPTCHASettings> settings)
        {
            _settings = settings.Value;
        }

        public virtual async Task<GoogleCaptchaResponse> VerifyToken(string _Token)
        {
            GoogleCaptchaData gd = new GoogleCaptchaData
            {
                Response = _Token,
                Secret = _settings.ReCAPTCHA_Secret_Key
            };

            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetStringAsync($"https://www.google.com/recaptcha/api/siteverify?secret={gd.Secret}&response={gd.Response}");
                return JsonConvert.DeserializeObject<GoogleCaptchaResponse>(response);
            }

        }
    }

    public class GoogleCaptchaData
    {
        public string Response { get; set; }
        public string Secret { get; set; }
    }


    public class GoogleCaptchaResponse
    {
        public bool Success { get; set; }
        public double Score { get; set; }
        public string Action { get; set; }
        public DateTime Challenge_TS { get; set; }
        public string HostName { get; set; }
    }
}
