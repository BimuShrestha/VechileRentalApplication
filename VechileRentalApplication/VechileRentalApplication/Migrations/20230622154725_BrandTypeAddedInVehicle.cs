using Microsoft.EntityFrameworkCore.Migrations;

namespace VechileRentalApplication.Migrations
{
    public partial class BrandTypeAddedInVehicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BrandTypes_VehicleTypes_VehicleTypeId",
                table: "BrandTypes");

            migrationBuilder.DropIndex(
                name: "IX_BrandTypes_VehicleTypeId",
                table: "BrandTypes");

            migrationBuilder.DropColumn(
                name: "VehicleTypeId",
                table: "BrandTypes");

            migrationBuilder.AddColumn<int>(
                name: "BrandTypeId",
                table: "Vehicles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_BrandTypeId",
                table: "Vehicles",
                column: "BrandTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_BrandTypes_BrandTypeId",
                table: "Vehicles",
                column: "BrandTypeId",
                principalTable: "BrandTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_BrandTypes_BrandTypeId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_BrandTypeId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "BrandTypeId",
                table: "Vehicles");

            migrationBuilder.AddColumn<int>(
                name: "VehicleTypeId",
                table: "BrandTypes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BrandTypes_VehicleTypeId",
                table: "BrandTypes",
                column: "VehicleTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_BrandTypes_VehicleTypes_VehicleTypeId",
                table: "BrandTypes",
                column: "VehicleTypeId",
                principalTable: "VehicleTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
