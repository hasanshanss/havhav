using HavhavAz.Models;
using HavhavAz.Models.AdModels;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.ForumModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Data
{
    public static class DbInitializer
    {
        public static void Seed(ApplicationDbContext context)
        {
            //I'm bombing here
            //ApplicationDbContext context = applicationBuilder.ApplicationServices.GetRequiredService<ApplicationDbContext>();

            if (!context.ForumTypes.Any())
            {

                ForumType care = new ForumType();
                care.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Qayğı", Culture = Culture.AZ });
                care.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Уход", Culture = Culture.RU });
                care.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Care", Culture = Culture.EN });
                context.ForumTypes.Add(care);

                ForumType disease = new ForumType();
                disease.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Xəstəliklər", Culture = Culture.AZ });
                disease.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Болезни", Culture = Culture.RU });
                disease.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Diseases", Culture = Culture.EN });
                context.ForumTypes.Add(disease);

                ForumType entertainment = new ForumType();
                entertainment.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Əyləncə", Culture = Culture.AZ });
                entertainment.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Развлечение", Culture = Culture.RU });
                entertainment.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Entertainment", Culture = Culture.EN });
                context.ForumTypes.Add(entertainment);

                ForumType nutrition = new ForumType();
                nutrition.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Gida", Culture = Culture.AZ });
                nutrition.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Питание", Culture = Culture.RU });
                nutrition.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Nutrition", Culture = Culture.EN });
                context.ForumTypes.Add(nutrition);

                ForumType bs = new ForumType();
                bs.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "\"Gözəllik salonları\"", Culture = Culture.AZ });
                bs.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "\"Салоны красоты\"", Culture = Culture.RU });
                bs.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "\"Beauty saloon\"", Culture = Culture.EN });
                context.ForumTypes.Add(bs);

                ForumType other = new ForumType();
                other.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Digər", Culture = Culture.AZ });
                other.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Другое", Culture = Culture.RU });
                other.ForumTypeTranslations.Add(new ForumTypeTranslations { Name = "Other", Culture = Culture.EN });
                context.ForumTypes.Add(other);

                context.SaveChanges();
            }

        }
    }
}
