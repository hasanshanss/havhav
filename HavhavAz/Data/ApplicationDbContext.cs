using System;
using System.Collections.Generic;
using System.Text;
using HavhavAz.Models;
using HavhavAz.Models.AdModels;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.ForumModels;
using HavhavAz.Models.MessageModels;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using HavhavAz.Models.VetModels;
using HavhavAz.Models.ShelterModels;

namespace HavhavAz.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Contacts> Contacts { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public DbSet<Charity> Charities { get; set; }
        public DbSet<Receipt> Receipts { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<PostTranslations> PostTranslations { get; set; }

        public DbSet<Ad> Ads { get; set; }

        public DbSet<Vet> Vets { get; set; }
        public DbSet<VetTranslations> VetTranslations { get; set; }

        public DbSet<Shelter> Shelters { get; set; }
        public DbSet<ShelterTranslations> ShelterTranslations { get; set; }

        public DbSet<ForumType> ForumTypes { get; set; }
        public DbSet<ForumTypeTranslations> ForumTypeTranslations { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                .HasIndex(m => m.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.User)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Receiver)
                .WithMany(m => m.MessagesFrom)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(m => m.MessagesTo)
                .OnDelete(DeleteBehavior.Restrict);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
