using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using OfficeOpenXml;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Net.Mime;

namespace ChineseOction.DAL
{
    public class RaffleDal : IRaffleDal
    {
        private readonly ChinesesOctionContext chinesesOctionContext;
        private readonly IWebHostEnvironment webHostEnvironment;

        public RaffleDal(ChinesesOctionContext chinesesOctionContext, IWebHostEnvironment webHostEnvironment)
        {
            this.chinesesOctionContext = chinesesOctionContext;
            this.webHostEnvironment = webHostEnvironment;
        }
        public async Task SendEmail(string recipientEmail, string gift)
        {
            try
            {
                SmtpClient client = new SmtpClient("smtp.office365.com");
                client.Port = 587;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("37326053899@mby.co.il", "Student@264");
                client.EnableSsl = true;
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("37326053899@mby.co.il", "chavi&mici");
                mailMessage.To.Add(recipientEmail);
                mailMessage.Subject = "🎉🎁 You won the chavi & mici Chinese lottery 🎁🎉";
                string body = $@"
                <html>
                <body>
                    <h2>Congratulations!</h2>
                    <p>We are happy to inform you that you won in our Chinese lottery in the <span style=""font-size: 20px;"">🎉{gift}🎉</span>.</p>
                    <p>You can receive the gift at our offices:</p>
                    <p><b>Address:</b> Hadron 3 Petah Tikva<br>
                    <b>Tel for details:</b> 0567821548</p>
                    <p style='color:red;'><i>*The gift is given up to 30 days after winning.<br>
                    The transport is the customer's responsibility.</i></p>
                    <p>Thank you and goodbye!</p>
                </body>
                </html>";
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;

                await client.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw;
            }
        }
        public async Task<Winner> GiftRaffle(int giftId)
        {
            try
            {
                var giftRaffle=await chinesesOctionContext.Winners.FirstOrDefaultAsync(w=>w.GiftId==giftId);
                if (giftRaffle != null)
                {
                    throw new Exception("The gift has already been drawn");
                }
                var purchaseLists = await chinesesOctionContext.PurchaseLists
                    .Where(p => p.GiftId == giftId)
                    .Include(p => p.Purchase)
                    .ThenInclude(u => u.Customer)
                    .ToListAsync();

                var users = purchaseLists.SelectMany(p => Enumerable.Repeat(p.Purchase.CustomerId, p.Quantity)).ToList();

                if (users.Count > 0)
                {
                    Random random = new Random();
                    int randomIndex = random.Next(users.Count);
                    int winnerUserId = users[randomIndex];

                    Winner winner = new Winner
                    {
                        UserId = winnerUserId,
                        GiftId = giftId,
                        DateWon = DateTime.Now,
                    };

                    await chinesesOctionContext.Winners.AddAsync(winner);
                    await chinesesOctionContext.SaveChangesAsync();

                    //var user = await chinesesOctionContext.Users.FirstOrDefaultAsync(u => u.Id == winnerUserId);
                   var gift = await chinesesOctionContext.Gifts.FirstOrDefaultAsync(g => g.Id == giftId);

                    //if (user != null && gift != null)
                    //{}
                    await SendEmail(winner.User.Mail,gift.Name);
                    

                    return winner;
                }
                else
                {
                    throw new Exception("No users found for the specified gift");
                }
            }
            catch (Exception ex)
            {
                // עיבוד השגיאה במידת הצורך, לוגים וכו'
                throw;
            }
        }
        public async Task<List<Winner>> GetWinners()
        {
            try
            {
                var winners = await chinesesOctionContext.Winners
                    .Include(g => g.Gift)
                    .Include(u => u.User)
                    .ToListAsync();
                if (winners.Count > 0)
                {    
                    return winners;
                }
                throw new Exception("The draw has not been made yet");

            }
            catch (Exception ex) { throw; }
        }
        public async Task<List<Winner>> ReportOfWinners()
        {
            try
            {
                var winners = await chinesesOctionContext.Winners
                    .Include(g => g.Gift)
                    .Include(u => u.User)
                    .ToListAsync();
                if (winners.Count > 0)
                {
                    await ExportToExcelAndSendEmail(winners, "37327160404@mby.co.il");
                    return winners;
                }
                throw new Exception("The draw has not been made yet");

            }
            catch (Exception ex) { throw; }
        }
        public async Task<List<GiftIncomeReport>> ReportOfIncome()
        {
            try
            {
                var giftQuantities = await chinesesOctionContext.PurchaseLists
                                    .Include(g => g.Gift)
                                    .GroupBy(p => p.GiftId)
                                    .Select(g => new GiftIncomeReport
                                    {
                                        GiftId = g.Key,
                                        Sum = g.Sum(p => p.Quantity * p.Gift.Price)
                                    })
                                    .ToListAsync();

                if (giftQuantities.Count > 0)
                {
                    await ExportToExcelAndSendEmail(giftQuantities, "37327160404@mby.co.il");
                    return giftQuantities;
                }
                throw new Exception("There were no sales proceeds yet");
            }
            catch (Exception ex) { throw; }

        }

        public async Task<string> ExportToExcelAndSendEmail<T>(List<T> dataList, string recipientEmail)
        {
            try
            {
                if (dataList == null || dataList.Count == 0)
                {
                    throw new Exception("No data to export.");
                }

                var fileName = $"export_{typeof(T).Name.ToLower()}_{DateTime.Now:yyyyMMddHHmmss}.xlsx";
                var filePath = Path.Combine(webHostEnvironment.ContentRootPath, fileName); // Assuming "Temp" folder for temporary storage

                // Set EPPlus license context
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial; // or LicenseContext.Commercial, depending on your license

                using (var package = new ExcelPackage(new FileInfo(filePath)))
                {
                    var worksheet = package.Workbook.Worksheets.Add("Data Export");

                    // Assuming T has public properties that you want to export
                    var properties = typeof(T).GetProperties();

                    // Add headers
                    for (int i = 0; i < properties.Length; i++)
                    {
                        worksheet.Cells[1, i + 1].Value = properties[i].Name;
                    }

                    // Add data rows
                    for (int row = 0; row < dataList.Count; row++)
                    {
                        for (int col = 0; col < properties.Length; col++)
                        {
                            worksheet.Cells[row + 2, col + 1].Value = properties[col].GetValue(dataList[row]);
                        }
                    }

                    await package.SaveAsync();
                }

                // Now send the email with the file attachment
                await SendEmailWithAttachment(recipientEmail, fileName, filePath);

                // Delete the temporary file after sending
                File.Delete(filePath);

                return fileName;
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to export and send Excel file: {ex.Message}");
            }
        }

        private async Task SendEmailWithAttachment(string recipientEmail, string fileName, string filePath)
        {
            try
            {
                using (SmtpClient client = new SmtpClient("smtp.office365.com"))
                {
                    client.Port = 587;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("37326053899@mby.co.il", "Student@264");
                    client.EnableSsl = true;

                    using (MailMessage mailMessage = new MailMessage())
                    {
                        mailMessage.From = new MailAddress("37326053899@mby.co.il", "chavi&mici");
                        mailMessage.To.Add(recipientEmail);
                        mailMessage.Subject = "Your exported file";
                        mailMessage.Body = "Please find attached your exported file.";

                        // Attach the file
                        Attachment attachment = new Attachment(filePath, MediaTypeNames.Application.Octet);
                        ContentDisposition disposition = attachment.ContentDisposition;
                        disposition.CreationDate = File.GetCreationTime(filePath);
                        disposition.ModificationDate = File.GetLastWriteTime(filePath);
                        disposition.ReadDate = File.GetLastAccessTime(filePath);
                        mailMessage.Attachments.Add(attachment);

                        // Send the email
                        await client.SendMailAsync(mailMessage);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error sending email with attachment: {ex.Message}");
            }
        }





    }

}
    

