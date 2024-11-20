using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChineseOction.Migrations
{
    /// <inheritdoc />
    public partial class addpicture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FirtName",
                table: "Donors",
                newName: "Picture");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Donors",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "100, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Donors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Donors");

            migrationBuilder.RenameColumn(
                name: "Picture",
                table: "Donors",
                newName: "FirtName");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Donors",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "100, 1");
        }
    }
}
