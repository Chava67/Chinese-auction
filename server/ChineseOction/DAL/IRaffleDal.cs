using ChineseOction.Models;

namespace ChineseOction.DAL
{
    public interface IRaffleDal
    {
        Task<Winner> GiftRaffle(int giftId);
        Task<List<GiftIncomeReport>> ReportOfIncome();
        Task<List<Winner>> ReportOfWinners();
        Task SendEmail(string recipientEmail, string gift);
        Task<List<Winner>> GetWinners();
    }
}