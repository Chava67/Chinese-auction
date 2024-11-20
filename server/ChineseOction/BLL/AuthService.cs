using ChineseOction.DAL;
using ChineseOction.Models;
using ChineseOction.Models.DTO;

namespace ChineseOction.BLL
{
    public class AuthService : IAuthService

    {
        private readonly IAuthDal authDal;

        public AuthService(IAuthDal userDal)
        {
            this.authDal = userDal;
        }
        public async Task<List<User>> GetAllUsers()
        {
            return await authDal.GetAllUsers();
        }
        public async Task<string> Login(LoginDto loginDto)
        {
            return await authDal.Login(loginDto);
        }
        public async Task Register(User user)
        {

             await authDal.Register(user);
        }
    }
}
