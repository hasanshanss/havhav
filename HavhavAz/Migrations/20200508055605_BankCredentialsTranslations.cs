using Microsoft.EntityFrameworkCore.Migrations;

namespace HavhavAz.Migrations
{
    public partial class BankCredentialsTranslations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BankCredentials",
                table: "Shelters");

            migrationBuilder.DropColumn(
                name: "BankCredentials",
                table: "Charities");

            migrationBuilder.AddColumn<string>(
                name: "BankCredentials",
                table: "ShelterTranslations",
                maxLength: 2500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BankCredentials",
                table: "CharityTranslations",
                maxLength: 2500,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BankCredentials",
                table: "ShelterTranslations");

            migrationBuilder.DropColumn(
                name: "BankCredentials",
                table: "CharityTranslations");

            migrationBuilder.AddColumn<string>(
                name: "BankCredentials",
                table: "Shelters",
                type: "nvarchar(2500)",
                maxLength: 2500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BankCredentials",
                table: "Charities",
                type: "nvarchar(2500)",
                maxLength: 2500,
                nullable: false,
                defaultValue: "");
        }
    }
}
