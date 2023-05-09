using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class IndexedTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Inventories_Location",
                table: "Inventories",
                column: "Location");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_Name",
                table: "Inventories",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_Price",
                table: "Inventories",
                column: "Price");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Inventories_Location",
                table: "Inventories");

            migrationBuilder.DropIndex(
                name: "IX_Inventories_Name",
                table: "Inventories");

            migrationBuilder.DropIndex(
                name: "IX_Inventories_Price",
                table: "Inventories");
        }
    }
}
