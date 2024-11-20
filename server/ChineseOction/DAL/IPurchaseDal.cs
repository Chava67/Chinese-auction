using ChineseOction.Models;

namespace ChineseOction.DAL
{
    public interface IPurchaseDal
    {
        Task<List<User>> GetDetails();
        Task<List<PurchaseList>> GetPurchaseByGift(int giftId);
        Task<List<PurchaseList>> SortByMaxPrice();
        Task<List<PurchaseList>> SortByMostPurchasedGift();
        Task<Purchase> PlaceOrder(int userId);
    }
}