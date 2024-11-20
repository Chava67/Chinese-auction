using ChineseOction.DAL;
using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IPurchaseDal purchaseDal;

        public PurchaseService(IPurchaseDal purchaseDal)
        {
            this.purchaseDal = purchaseDal;
        }
        public async Task<List<User>> GetDetails()
        {
            return await purchaseDal.GetDetails();
        }
        public async Task<List<PurchaseList>> GetPurchaseByGift(int giftId)
        {
            return await purchaseDal.GetPurchaseByGift(giftId);
        }
        public async Task<List<PurchaseList>> SortByMaxPrice()
        {
            return await purchaseDal.SortByMaxPrice();
        }
        public async Task<List<PurchaseList>> SortByMostPurchasedGift()
        {
            return await purchaseDal.SortByMostPurchasedGift();
        }
        public async Task<Purchase> PlaceOrder(int userId)
        {
            return await purchaseDal.PlaceOrder(userId);
        }



    }
}
