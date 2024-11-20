using ChineseOction.Models;
using ChineseOction.Models.DTO;

namespace ChineseOction.DAL
{
    public interface IAuthDal
    {
        object Configuration { get; }

        Task<List<User>> GetAllUsers();
        Task<string> Login(LoginDto loginDto);
        Task Register(User user);

    }
}