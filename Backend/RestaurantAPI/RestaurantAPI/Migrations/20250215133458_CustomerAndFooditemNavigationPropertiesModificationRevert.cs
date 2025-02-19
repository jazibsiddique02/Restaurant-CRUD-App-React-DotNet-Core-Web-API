using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantAPI.Migrations
{
    /// <inheritdoc />
    public partial class CustomerAndFooditemNavigationPropertiesModificationRevert : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_OrderMasters_CustomerId",
                table: "OrderMasters",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_FoodItemId",
                table: "OrderDetails",
                column: "FoodItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_FoodItems_FoodItemId",
                table: "OrderDetails",
                column: "FoodItemId",
                principalTable: "FoodItems",
                principalColumn: "FoodItemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderMasters_Customers_CustomerId",
                table: "OrderMasters",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "CustomerID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_FoodItems_FoodItemId",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderMasters_Customers_CustomerId",
                table: "OrderMasters");

            migrationBuilder.DropIndex(
                name: "IX_OrderMasters_CustomerId",
                table: "OrderMasters");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_FoodItemId",
                table: "OrderDetails");
        }
    }
}
