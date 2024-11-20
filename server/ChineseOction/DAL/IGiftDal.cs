using ChineseOction.Models;

namespace ChineseOction.DAL
{
    public interface IGiftDal
    {
        Task<Gift> AddGift(Gift gift);
        Task DeleteGift(int id);
        Task<List<Gift>> GetAllCategories();
        Task<List<Gift>> GetAllGifts();
        Task<List<Donor>> GetDonorByGiftId(int id);
        Task<List<Gift>> SearchGiftByDonor(string name);
        Task<List<Gift>> SearchGiftByName(string name);
        Task<List<Gift>> SearchGiftByNumPurch(int num);
        Task<List<Gift>> SortByCategory();
        Task<List<Gift>> SortByPrice();
        Task<Gift> UpdateGift(Gift gift);
    }
}