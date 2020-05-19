using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HavhavAz.Migrations
{
    public partial class FoundedYear : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FoundedDate",
                table: "Vets");

            migrationBuilder.DropColumn(
                name: "FoundedDate",
                table: "Shelters");

            migrationBuilder.AddColumn<int>(
                name: "FoundedYear",
                table: "Vets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FoundedYear",
                table: "Shelters",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FoundedYear",
                table: "Vets");

            migrationBuilder.DropColumn(
                name: "FoundedYear",
                table: "Shelters");

            migrationBuilder.AddColumn<DateTime>(
                name: "FoundedDate",
                table: "Vets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "FoundedDate",
                table: "Shelters",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
