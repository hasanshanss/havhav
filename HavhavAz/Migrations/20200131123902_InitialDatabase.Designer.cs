﻿// <auto-generated />
using System;
using HavhavAz.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HavhavAz.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20200131123902_InitialDatabase")]
    partial class InitialDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HavhavAz.Models.AdModels.Ad", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AdType");

                    b.Property<byte>("AgeMonth");

                    b.Property<byte>("AgeYear");

                    b.Property<string>("Breed")
                        .HasMaxLength(50);

                    b.Property<string>("Color")
                        .HasMaxLength(50);

                    b.Property<DateTime>("CreatedDate");

                    b.Property<bool>("Gender");

                    b.Property<DateTime>("LastActionDate");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25);

                    b.Property<int>("State");

                    b.Property<int>("UserId");

                    b.HasKey("ID");

                    b.HasIndex("UserId");

                    b.ToTable("Ads");
                });

            modelBuilder.Entity("HavhavAz.Models.AdModels.AdTranslations", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AdId");

                    b.Property<int>("Culture");

                    b.Property<string>("Info")
                        .IsRequired()
                        .HasMaxLength(3000);

                    b.HasKey("ID");

                    b.HasIndex("AdId");

                    b.ToTable("AdTranslations");
                });

            modelBuilder.Entity("HavhavAz.Models.CharityModels.Charity", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount");

                    b.Property<string>("BankCredentials")
                        .IsRequired()
                        .HasMaxLength(2500);

                    b.Property<int>("CollectedAmount");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<DateTime>("LastActionDate");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25);

                    b.Property<int>("State");

                    b.Property<int>("UserId");

                    b.HasKey("ID");

                    b.HasIndex("UserId");

                    b.ToTable("Charities");
                });

            modelBuilder.Entity("HavhavAz.Models.CharityModels.CharityTranslations", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CharityId");

                    b.Property<int>("Culture");

                    b.Property<string>("Info")
                        .IsRequired()
                        .HasMaxLength(3000);

                    b.HasKey("ID");

                    b.HasIndex("CharityId");

                    b.ToTable("CharityTranslations");
                });

            modelBuilder.Entity("HavhavAz.Models.CharityModels.Receipt", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount");

                    b.Property<int>("CharityId");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Name")
                        .HasMaxLength(20);

                    b.Property<int>("State");

                    b.HasKey("ID");

                    b.HasIndex("CharityId");

                    b.ToTable("Receipts");
                });

            modelBuilder.Entity("HavhavAz.Models.CommentModels.Comment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(2500);

                    b.Property<DateTime>("Date");

                    b.Property<int>("PostId");

                    b.Property<int>("UserId");

                    b.HasKey("ID");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("HavhavAz.Models.ContactsModels.Address", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ContactsId");

                    b.Property<int>("Culture");

                    b.Property<string>("Location")
                        .HasMaxLength(500);

                    b.HasKey("ID");

                    b.HasIndex("ContactsId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("HavhavAz.Models.ContactsModels.Contacts", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Facebook")
                        .HasMaxLength(25);

                    b.Property<string>("Instagram")
                        .HasMaxLength(25);

                    b.Property<string>("Phone")
                        .HasMaxLength(50);

                    b.Property<int>("SubjectId");

                    b.Property<int>("SubjectType");

                    b.Property<string>("Whatsapp")
                        .HasMaxLength(25);

                    b.HasKey("ID");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("HavhavAz.Models.ForumModels.ForumType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Position");

                    b.HasKey("ID");

                    b.ToTable("ForumTypes");
                });

            modelBuilder.Entity("HavhavAz.Models.ForumModels.ForumTypeTranslations", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Culture");

                    b.Property<int>("ForumTypeId");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.HasIndex("ForumTypeId");

                    b.ToTable("ForumTypeTranslations");
                });

            modelBuilder.Entity("HavhavAz.Models.Log", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date");

                    b.Property<string>("IP");

                    b.Property<int>("LogType");

                    b.Property<string>("Message");

                    b.Property<int>("UserId");

                    b.HasKey("ID");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("HavhavAz.Models.MessageModels.Message", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(2500);

                    b.Property<DateTime>("Date");

                    b.Property<bool>("IsSeen");

                    b.Property<int>("ReceiverId");

                    b.Property<DateTime>("SeenDate");

                    b.Property<int>("SenderId");

                    b.HasKey("ID");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("HavhavAz.Models.NotificationModels.Notification", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AuthorId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<bool>("IsViewed");

                    b.Property<int>("NotificationType");

                    b.Property<int>("SubjectId");

                    b.Property<int>("UserId");

                    b.HasKey("ID");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("HavhavAz.Models.PostModels.Post", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate");

                    b.Property<DateTime>("LastActionDate");

                    b.Property<int>("PostType");

                    b.Property<int>("State");

                    b.Property<int>("SubjectId");

                    b.Property<int>("UserId");

                    b.Property<int>("Views");

                    b.HasKey("ID");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("HavhavAz.Models.PostModels.PostTranslations", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(5000);

                    b.Property<int>("Culture");

                    b.Property<int>("PostId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.HasKey("ID");

                    b.HasIndex("PostId");

                    b.ToTable("PostTranslations");
                });

            modelBuilder.Entity("HavhavAz.Models.ShelterModels.Shelter", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BankCredentials")
                        .IsRequired()
                        .HasMaxLength(2500);

                    b.Property<DateTime>("FoundedDate");

                    b.Property<int>("Position");

                    b.HasKey("ID");

                    b.ToTable("Shelters");
                });

            modelBuilder.Entity("HavhavAz.Models.ShelterModels.ShelterTranslations", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Culture");

                    b.Property<string>("Info")
                        .IsRequired()
                        .HasMaxLength(3000);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<int>("ShelterId");

                    b.HasKey("ID");

                    b.HasIndex("ShelterId");

                    b.ToTable("ShelterTranslations");
                });

            modelBuilder.Entity("HavhavAz.Models.UserModels.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("BirthDate");

                    b.Property<bool>("DOB_Hide");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<bool>("Gender");

                    b.Property<string>("Info")
                        .HasMaxLength(3000);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<DateTime>("RegisteredDate");

                    b.Property<string>("ResetPasswordCode");

                    b.Property<DateTime>("ResetPasswordDate");

                    b.Property<int>("Role");

                    b.Property<string>("Salt")
                        .IsRequired();

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(15);

                    b.HasKey("ID");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HavhavAz.Models.VetModels.Vet", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("FoundedDate");

                    b.Property<int>("Position");

                    b.HasKey("ID");

                    b.ToTable("Vets");
                });

            modelBuilder.Entity("HavhavAz.Models.VetModels.VetTranslations", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Culture");

                    b.Property<string>("Info")
                        .IsRequired()
                        .HasMaxLength(3000);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<int>("VetId");

                    b.HasKey("ID");

                    b.HasIndex("VetId");

                    b.ToTable("VetTranslations");
                });

            modelBuilder.Entity("HavhavAz.Models.AdModels.Ad", b =>
                {
                    b.HasOne("HavhavAz.Models.UserModels.User", "User")
                        .WithMany("Ads")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.AdModels.AdTranslations", b =>
                {
                    b.HasOne("HavhavAz.Models.AdModels.Ad", "Ad")
                        .WithMany("AdTranslations")
                        .HasForeignKey("AdId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.CharityModels.Charity", b =>
                {
                    b.HasOne("HavhavAz.Models.UserModels.User", "User")
                        .WithMany("Charities")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.CharityModels.CharityTranslations", b =>
                {
                    b.HasOne("HavhavAz.Models.CharityModels.Charity", "Charity")
                        .WithMany("CharityTranslations")
                        .HasForeignKey("CharityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.CharityModels.Receipt", b =>
                {
                    b.HasOne("HavhavAz.Models.CharityModels.Charity", "Charity")
                        .WithMany("Receipts")
                        .HasForeignKey("CharityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.CommentModels.Comment", b =>
                {
                    b.HasOne("HavhavAz.Models.PostModels.Post", "Post")
                        .WithMany()
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HavhavAz.Models.UserModels.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("HavhavAz.Models.ContactsModels.Address", b =>
                {
                    b.HasOne("HavhavAz.Models.ContactsModels.Contacts", "Contacts")
                        .WithMany("Addresses")
                        .HasForeignKey("ContactsId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.ForumModels.ForumTypeTranslations", b =>
                {
                    b.HasOne("HavhavAz.Models.ForumModels.ForumType", "ForumType")
                        .WithMany("ForumTypeTranslations")
                        .HasForeignKey("ForumTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.MessageModels.Message", b =>
                {
                    b.HasOne("HavhavAz.Models.UserModels.User", "Receiver")
                        .WithMany("MessagesFrom")
                        .HasForeignKey("ReceiverId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("HavhavAz.Models.UserModels.User", "Sender")
                        .WithMany("MessagesTo")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("HavhavAz.Models.NotificationModels.Notification", b =>
                {
                    b.HasOne("HavhavAz.Models.UserModels.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.PostModels.Post", b =>
                {
                    b.HasOne("HavhavAz.Models.UserModels.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.PostModels.PostTranslations", b =>
                {
                    b.HasOne("HavhavAz.Models.PostModels.Post", "Post")
                        .WithMany("PostTranslations")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.ShelterModels.ShelterTranslations", b =>
                {
                    b.HasOne("HavhavAz.Models.ShelterModels.Shelter", "Shelter")
                        .WithMany("ShelterTranslations")
                        .HasForeignKey("ShelterId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HavhavAz.Models.VetModels.VetTranslations", b =>
                {
                    b.HasOne("HavhavAz.Models.VetModels.Vet", "Vet")
                        .WithMany("VetTranslations")
                        .HasForeignKey("VetId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}