using ChineseOction.DAL;
using ChineseOction.Models;
using Microsoft.Extensions.FileSystemGlobbing.Internal;

namespace ChineseOction.BLL
{
    public class RaffleService : IRaffleService
    {
        private readonly IRaffleDal raffleDal;
        public RaffleService(IRaffleDal raffleDal)
        {
            this.raffleDal = raffleDal;
        }
        public async Task<Winner> GiftRaffle(int giftId)
        {
            return await raffleDal.GiftRaffle(giftId);
        }
        public async Task<List<GiftIncomeReport>> ReportOfIncome()
        {
            return await raffleDal.ReportOfIncome();
        }
        public async Task<List<Winner>> ReportOfWinners()
        {
            return await raffleDal.ReportOfWinners();
        }
        public async Task<List<Winner>> GetWinners()
        {
            return await raffleDal.GetWinners();
        }

    }
}
