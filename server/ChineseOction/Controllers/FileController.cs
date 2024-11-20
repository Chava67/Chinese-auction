using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ChineseOction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly string _basePath = "wwwroot/images"; // נתיב לתיקיית התמונות בשרת

        [HttpGet("list")]
        public IActionResult GetFileList()
        {
            try
            {
                var files = Directory.GetFiles(_basePath).Select(Path.GetFileName).ToList();
                return Ok(files);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("save")]
        public async Task<IActionResult> SaveFile(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("File is not selected or is empty.");
                }

                var fileName = file.FileName; // שימור שם הקובץ המקורי
                var filePath = Path.Combine(_basePath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var publicPath = Path.Combine("images", fileName); // נתיב נגיש לציבור
                return Ok(new { FilePath = publicPath }); // מחזיר את הנתיב הנגיש לציבור
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }
        [HttpGet("get/{fileName}")]
        public IActionResult GetFile(string fileName)
        {
            try
            {
                var filePath = Path.Combine(_basePath, fileName);

                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound("File not found.");
                }

                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                var contentType = "image/jpeg"; // עדכן את ה-content type בהתאם לסוג הקובץ

                return File(fileBytes, contentType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
