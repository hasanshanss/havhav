using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HavhavAz.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using HavhavAz.Services.Interfaces;
using AspNetCore.RouteAnalyzer;
using HavhavAz.Services;
using Microsoft.AspNetCore.SignalR;
using HavhavAz.Hubs;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using HavhavAz.Providers;
using HavhavAz.Validation;
using Microsoft.AspNetCore.Http;
using HavhavAz.Middlewares;
using HavhavAz.Models;
using HavhavAz.Models.CaptchaModels;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authorization;
using HavhavAz.Filters.AuthPolicies;
using System.Security.Claims;
using static HavhavAz.Models.UserModels.User;

namespace HavhavAz
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLocalization(options => options.ResourcesPath = "Resources");
            services.AddSignalR(options=>
            {
                options.EnableDetailedErrors = true;
            });

            services.AddRouteAnalyzer();

            services.AddSingleton<IUserIdProvider, NameUserIdProvider>();
            services.AddTransient<IServiceWrapper, ServiceWrapper>();
            services.AddTransient<GoogleCaptchaService>();

            services.Configure<RequestLocalizationOptions>(options =>
            {
                var supportedCultures = new[]
                {
                    new CultureInfo("az"),
                    new CultureInfo("ru"),
                    new CultureInfo("en")
                };

                options.DefaultRequestCulture = new RequestCulture("az");
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
                options.RequestCultureProviders = new List<IRequestCultureProvider>
                {
                    new QueryStringRequestCultureProvider(),
                    new CookieRequestCultureProvider()
                };  
            });

            services.Configure<ReCAPTCHASettings>(Configuration.GetSection("GooglereCAPTCHA"));
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            services.AddTransient<IAuthorizationHandler, RoleHandler>();

            services.AddAuthorization(opts =>
            {
                opts.AddPolicy("AdminConstraint",
                    policy => policy.RequireClaim(ClaimsIdentity.DefaultRoleClaimType, "Admin")
                );

            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.LoginPath = new PathString("/Account/Login");
                options.AccessDeniedPath = new PathString("/Account/Login");
                //options.ExpireTimeSpan = TimeSpan.FromDays(1);
                options.Cookie.Domain = ".havhav.az";
            });

            services.AddSession(options =>
            {
                //options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.HttpOnly = true;
            });

            services.AddControllersWithViews(options => options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute()))
                .AddDataAnnotationsLocalization(options => {
                    options.DataAnnotationLocalizerProvider = (type, factory) =>
                        factory.Create(typeof(ValidationMessages));
                })
                .AddViewLocalization()
                .AddViewOptions(options =>  options.HtmlHelperOptions.ClientValidationEnabled = false);
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            env.EnvironmentName = Environments.Production;

            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
                app.UseStatusCodePagesWithReExecute("/error/{0}");
                app.UseHsts();
            }

            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            var cachePeriod = env.IsDevelopment() ? "600" : "604800";
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
                }
            });

            app.UseCors(builder =>
            {
                builder.WithOrigins("http://www.havhav.az")
                    .AllowAnyHeader()
                    .WithMethods("GET", "POST")
                    .AllowCredentials();
            });

            app.UseLanguageSwitcher();
            app.UseHttpsRedirection();
            app.UseCookiePolicy();
            app.UseSession();
            app.UseHttpHeaders();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<CommentHub>("/comment");
                endpoints.MapHub<NotificationHub>("/notification");
                endpoints.MapHub<ChatHub>("/chat");

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
