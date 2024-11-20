using ChineseOction.Controllers;
using ChineseOction.DAL;
using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public class GiftService : IGiftService
    {
        private readonly IGiftDal giftDal;

        public GiftService(IGiftDal giftDal)
        {
            this.giftDal = giftDal;
        }
        public async Task<List<Gift>> GetAllGifts()
        {
            return await giftDal.GetAllGifts();
        }
        public async Task<Gift> AddGift(Gift gift)
        {
            return await giftDal.AddGift(gift);
        }
        public async Task<Gift> UpdateGift(Gift gift)
        {
            return await giftDal.UpdateGift(gift);
        }
        public async Task DeleteGift(int id)
        {
            await giftDal.DeleteGift(id);
        }
        public async Task<List<Donor>> GetDonorByGiftId(int id)
        {
            return await giftDal.GetDonorByGiftId(id);
        }
        public async Task<List<Gift>> SearchGiftByName(string name)
        {
            return await giftDal.SearchGiftByName(name);
        }
        public async Task<List<Gift>> SearchGiftByDonor(string name)
        {
            return await giftDal.SearchGiftByDonor(name);
        }
        public async Task<List<Gift>> SearchGiftByNumPurch(int num)
        {
            return await giftDal.SearchGiftByNumPurch(num);
        }
        public async Task<List<Gift>> SortByCategory()
        {
            return await giftDal.SortByCategory();
        }
        public async Task<List<Gift>> SortByPrice()
        {
            return await giftDal.SortByPrice();
        }
    }
}
