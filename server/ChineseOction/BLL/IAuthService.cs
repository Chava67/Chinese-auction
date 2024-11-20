using ChineseOction.Models;
using ChineseOction.Models.DTO;

namespace ChineseOction.BLL
{
    public interface IAuthService
    {
        Task<List<User>> GetAllUsers();
        Task<string> Login(LoginDto loginDto);
        Task Register(User user);
    }
}