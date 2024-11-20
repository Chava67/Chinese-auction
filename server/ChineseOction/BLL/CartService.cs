using ChineseOction.DAL;
using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public class CartService : ICartService
    {
        private readonly ICartDal cartDal;

        public CartService(ICartDal cartDal)
        {
            this.cartDal = cartDal;
        }
        public async Task<int> AddToCart(int userId, int giftId, int quantity)
        {
            return await cartDal.AddToCart(userId, giftId,quantity);
        }
        public async Task<List<Cart>> GetCart(int userId)
        {
            return await cartDal.GetCart(userId);
        }
        public async Task<int> Increas(int userId, int giftId)
        {
            return await cartDal.Increas(userId, giftId);
        }

        public Task Increase(int userId, int giftId)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Reduce(int userId, int giftId)
        {
            return await cartDal.Reduce(userId, giftId);
        }
        public async Task<int> RemoveFromCart(int userId, int giftId)
        {
            return await cartDal.RemoveFromCart(userId, giftId);
        }
    }
}
