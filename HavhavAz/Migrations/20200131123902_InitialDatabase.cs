using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HavhavAz.Migrations
{
    public partial class InitialDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "Contacts",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Facebook = table.Column<string>(maxLength: 25, nullable: true),
            //        Whatsapp = table.Column<string>(maxLength: 25, nullable: true),
            //        Instagram = table.Column<string>(maxLength: 25, nullable: true),
            //        Phone = table.Column<string>(maxLength: 50, nullable: true),
            //        SubjectId = table.Column<int>(nullable: false),
            //        SubjectType = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Contacts", x => x.ID);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ForumTypes",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Position = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ForumTypes", x => x.ID);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Logs",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Message = table.Column<string>(nullable: true),
            //        IP = table.Column<string>(nullable: true),
            //        Date = table.Column<DateTime>(nullable: false),
            //        UserId = table.Column<int>(nullable: false),
            //        LogType = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Logs", x => x.ID);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Shelters",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        FoundedDate = table.Column<DateTime>(nullable: false),
            //        Position = table.Column<int>(nullable: false),
            //        BankCredentials = table.Column<string>(maxLength: 2500, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Shelters", x => x.ID);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Users",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Email = table.Column<string>(nullable: false),
            //        Info = table.Column<string>(maxLength: 3000, nullable: true),
            //        Password = table.Column<string>(nullable: false),
            //        Username = table.Column<string>(maxLength: 15, nullable: false),
            //        Name = table.Column<string>(maxLength: 50, nullable: false),
            //        Salt = table.Column<string>(nullable: false),
            //        BirthDate = table.Column<DateTime>(nullable: false),
            //        DOB_Hide = table.Column<bool>(nullable: false),
            //        Gender = table.Column<bool>(nullable: false),
            //        ResetPasswordCode = table.Column<string>(nullable: true),
            //        ResetPasswordDate = table.Column<DateTime>(nullable: false),
            //        RegisteredDate = table.Column<DateTime>(nullable: false),
            //        Role = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Users", x => x.ID);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Vets",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        FoundedDate = table.Column<DateTime>(nullable: false),
            //        Position = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Vets", x => x.ID);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Addresses",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Location = table.Column<string>(maxLength: 500, nullable: true),
            //        Culture = table.Column<int>(nullable: false),
            //        ContactsId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Addresses", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_Addresses_Contacts_ContactsId",
            //            column: x => x.ContactsId,
            //            principalTable: "Contacts",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ForumTypeTranslations",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Name = table.Column<string>(nullable: true),
            //        Culture = table.Column<int>(nullable: false),
            //        ForumTypeId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ForumTypeTranslations", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_ForumTypeTranslations_ForumTypes_ForumTypeId",
            //            column: x => x.ForumTypeId,
            //            principalTable: "ForumTypes",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ShelterTranslations",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Name = table.Column<string>(maxLength: 100, nullable: false),
            //        Info = table.Column<string>(maxLength: 3000, nullable: false),
            //        Culture = table.Column<int>(nullable: false),
            //        ShelterId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ShelterTranslations", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_ShelterTranslations_Shelters_ShelterId",
            //            column: x => x.ShelterId,
            //            principalTable: "Shelters",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Ads",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        CreatedDate = table.Column<DateTime>(nullable: false),
            //        LastActionDate = table.Column<DateTime>(nullable: false),
            //        State = table.Column<int>(nullable: false),
            //        Name = table.Column<string>(maxLength: 25, nullable: false),
            //        Color = table.Column<string>(maxLength: 50, nullable: true),
            //        Breed = table.Column<string>(maxLength: 50, nullable: true),
            //        Gender = table.Column<bool>(nullable: false),
            //        AgeYear = table.Column<byte>(nullable: false),
            //        AgeMonth = table.Column<byte>(nullable: false),
            //        AdType = table.Column<int>(nullable: false),
            //        UserId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Ads", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_Ads_Users_UserId",
            //            column: x => x.UserId,
            //            principalTable: "Users",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Charities",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Name = table.Column<string>(maxLength: 25, nullable: false),
            //        BankCredentials = table.Column<string>(maxLength: 2500, nullable: false),
            //        Amount = table.Column<int>(nullable: false),
            //        CollectedAmount = table.Column<int>(nullable: false),
            //        CreatedDate = table.Column<DateTime>(nullable: false),
            //        LastActionDate = table.Column<DateTime>(nullable: false),
            //        State = table.Column<int>(nullable: false),
            //        UserId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Charities", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_Charities_Users_UserId",
            //            column: x => x.UserId,
            //            principalTable: "Users",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Messages",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Date = table.Column<DateTime>(nullable: false),
            //        Content = table.Column<string>(maxLength: 2500, nullable: false),
            //        IsSeen = table.Column<bool>(nullable: false),
            //        SeenDate = table.Column<DateTime>(nullable: false),
            //        SenderId = table.Column<int>(nullable: false),
            //        ReceiverId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Messages", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_Messages_Users_ReceiverId",
            //            column: x => x.ReceiverId,
            //            principalTable: "Users",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_Messages_Users_SenderId",
            //            column: x => x.SenderId,
            //            principalTable: "Users",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Notifications",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        SubjectId = table.Column<int>(nullable: false),
            //        AuthorId = table.Column<int>(nullable: false),
            //        NotificationType = table.Column<int>(nullable: false),
            //        UserId = table.Column<int>(nullable: false),
            //        IsViewed = table.Column<bool>(nullable: false),
            //        CreatedDate = table.Column<DateTime>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Notifications", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_Notifications_Users_UserId",
            //            column: x => x.UserId,
            //            principalTable: "Users",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Posts",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Views = table.Column<int>(nullable: false),
            //        CreatedDate = table.Column<DateTime>(nullable: false),
            //        LastActionDate = table.Column<DateTime>(nullable: false),
            //        State = table.Column<int>(nullable: false),
            //        SubjectId = table.Column<int>(nullable: false),
            //        PostType = table.Column<int>(nullable: false),
            //        UserId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Posts", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_Posts_Users_UserId",
            //            column: x => x.UserId,
            //            principalTable: "Users",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "VetTranslations",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Name = table.Column<string>(maxLength: 100, nullable: false),
            //        Info = table.Column<string>(maxLength: 3000, nullable: false),
            //        Culture = table.Column<int>(nullable: false),
            //        VetId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_VetTranslations", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_VetTranslations_Vets_VetId",
            //            column: x => x.VetId,
            //            principalTable: "Vets",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AdTranslations",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Info = table.Column<string>(maxLength: 3000, nullable: false),
            //        Culture = table.Column<int>(nullable: false),
            //        AdId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AdTranslations", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_AdTranslations_Ads_AdId",
            //            column: x => x.AdId,
            //            principalTable: "Ads",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "CharityTranslations",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Info = table.Column<string>(maxLength: 3000, nullable: false),
            //        Culture = table.Column<int>(nullable: false),
            //        CharityId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_CharityTranslations", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_CharityTranslations_Charities_CharityId",
            //            column: x => x.CharityId,
            //            principalTable: "Charities",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Receipts",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Name = table.Column<string>(maxLength: 20, nullable: true),
            //        Amount = table.Column<int>(nullable: false),
            //        Date = table.Column<DateTime>(nullable: false),
            //        CharityId = table.Column<int>(nullable: false),
            //        State = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Receipts", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_Receipts_Charities_CharityId",
            //            column: x => x.CharityId,
            //            principalTable: "Charities",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Comments",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Date = table.Column<DateTime>(nullable: false),
            //        Content = table.Column<string>(maxLength: 2500, nullable: false),
            //        PostId = table.Column<int>(nullable: false),
            //        UserId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Comments", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_Comments_Posts_PostId",
            //            column: x => x.PostId,
            //            principalTable: "Posts",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Comments_Users_UserId",
            //            column: x => x.UserId,
            //            principalTable: "Users",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "PostTranslations",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Title = table.Column<string>(maxLength: 250, nullable: false),
            //        Content = table.Column<string>(maxLength: 5000, nullable: false),
            //        Culture = table.Column<int>(nullable: false),
            //        PostId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_PostTranslations", x => x.ID);
            //        table.ForeignKey(
            //            name: "FK_PostTranslations_Posts_PostId",
            //            column: x => x.PostId,
            //            principalTable: "Posts",
            //            principalColumn: "ID",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_Addresses_ContactsId",
            //    table: "Addresses",
            //    column: "ContactsId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Ads_UserId",
            //    table: "Ads",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AdTranslations_AdId",
            //    table: "AdTranslations",
            //    column: "AdId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Charities_UserId",
            //    table: "Charities",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_CharityTranslations_CharityId",
            //    table: "CharityTranslations",
            //    column: "CharityId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Comments_PostId",
            //    table: "Comments",
            //    column: "PostId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Comments_UserId",
            //    table: "Comments",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ForumTypeTranslations_ForumTypeId",
            //    table: "ForumTypeTranslations",
            //    column: "ForumTypeId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Messages_ReceiverId",
            //    table: "Messages",
            //    column: "ReceiverId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Messages_SenderId",
            //    table: "Messages",
            //    column: "SenderId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Notifications_UserId",
            //    table: "Notifications",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Posts_UserId",
            //    table: "Posts",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PostTranslations_PostId",
            //    table: "PostTranslations",
            //    column: "PostId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Receipts_CharityId",
            //    table: "Receipts",
            //    column: "CharityId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ShelterTranslations_ShelterId",
            //    table: "ShelterTranslations",
            //    column: "ShelterId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Users_Username",
            //    table: "Users",
            //    column: "Username",
            //    unique: true);

            //migrationBuilder.CreateIndex(
            //    name: "IX_VetTranslations_VetId",
            //    table: "VetTranslations",
            //    column: "VetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "AdTranslations");

            migrationBuilder.DropTable(
                name: "CharityTranslations");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "ForumTypeTranslations");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "PostTranslations");

            migrationBuilder.DropTable(
                name: "Receipts");

            migrationBuilder.DropTable(
                name: "ShelterTranslations");

            migrationBuilder.DropTable(
                name: "VetTranslations");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Ads");

            migrationBuilder.DropTable(
                name: "ForumTypes");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Charities");

            migrationBuilder.DropTable(
                name: "Shelters");

            migrationBuilder.DropTable(
                name: "Vets");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
