using HavhavAz.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Middlewares
{
    public class HttpHeadersMiddleware
    {
        private readonly RequestDelegate _next;

        public HttpHeadersMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            context.AddHeader("X-Frame-Options", "DENY");
            context.AddHeader("X-Xss-Protection", "1; mode=block");
            context.AddHeader("X-Content-Type-Options", "nosniff");
            context.AddHeader("Referrer-Policy", "no-referrer");
            context.AddHeader("X-Permitted-Cross-Domain-Policies", "none");
            context.AddHeader("Content-Security-Policy", "default-src *; img-src 'self' data:; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'");
            context.AddHeader("Feature-Policy", "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'");

            await _next.Invoke(context);
        }
    }
}


