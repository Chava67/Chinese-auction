using ChineseOction.Models;

namespace ChineseOction.DAL
{
    public interface ICartDal
    {
        Task<int> AddToCart(int userId, int giftId, int quantity);
        Task<List<Cart>> GetCart(int userId);
        Task<int> Increas(int userId, int giftId);
        Task<int> Reduce(int userId, int giftId);
        Task<int> RemoveFromCart(int userId, int giftId);
    }
}