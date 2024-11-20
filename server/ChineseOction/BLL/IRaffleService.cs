using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public interface IRaffleService
    {
        Task<Winner> GiftRaffle(int giftId);
        Task<List<GiftIncomeReport>> ReportOfIncome();
        Task<List<Winner>> ReportOfWinners();
        Task<List<Winner>> GetWinners();
    }
}