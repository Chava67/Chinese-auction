using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public interface IPurchaseService
    {
        Task<List<User>> GetDetails();
        Task<List<PurchaseList>> GetPurchaseByGift(int giftId);
        Task<List<PurchaseList>> SortByMaxPrice();
        Task<List<PurchaseList>> SortByMostPurchasedGift();
        Task<Purchase> PlaceOrder(int userId);

    }
}