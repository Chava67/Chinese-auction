using ChineseOction.DAL;
using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public interface IGiftService
    {
        Task<Gift> AddGift(Gift gift);
        Task DeleteGift(int id);
        Task<List<Gift>> GetAllGifts();
        Task<List<Donor>> GetDonorByGiftId(int id);
        Task<List<Gift>> SearchGiftByDonor(string name);
        Task<List<Gift>> SearchGiftByName(string name);
        Task<List<Gift>> SearchGiftByNumPurch(int num);
        Task<Gift> UpdateGift(Gift gift);
        Task<List<Gift>> SortByCategory();
        Task<List<Gift>> SortByPrice();
       
    }
}