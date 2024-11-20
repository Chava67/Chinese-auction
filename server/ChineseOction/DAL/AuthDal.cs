using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace ChineseOction.DAL
{
    public class AuthDal : IAuthDal
    {
        private readonly ChinesesOctionContext chinesesOctionContext;
        private readonly IConfiguration configuration;

        public AuthDal(ChinesesOctionContext chinesesOctionContext, IConfiguration configuration)
        {
            this.chinesesOctionContext = chinesesOctionContext;
            this.configuration = configuration;
        }

        public object Configuration => throw new NotImplementedException();

        public async Task<List<User>> GetAllUsers()
        {
            return await chinesesOctionContext.Users.ToListAsync();
        }
       
        public async Task<string> Login(LoginDto loginDto)
        {
            try
            {
                
                var user = await chinesesOctionContext.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName && u.Password == loginDto.Password);
                if (user != null)
                {
                 var claims = new List<Claim>
            {
             
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),  // ודא שזה מספר שלם
                new Claim("UserName", user.UserName),
                new Claim("fullName",user.FirstName+user.LastName),
                new Claim(ClaimTypes.Role, user.Permission.ToString())  ,
                new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        configuration["Jwt:Issuer"],
                        configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(300),
                        signingCredentials: signIn
                    );

                    return new JwtSecurityTokenHandler().WriteToken(token);
                }
                else
                {
                    throw new Exception("Invalid username or password.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred during login.", ex);
            }
        }
        public async Task Register(User user)
        {
            try
            {

                var userName=await chinesesOctionContext.Users.FirstOrDefaultAsync(u=>u.UserName==user.UserName);
                if(userName != null)
                {
                    throw new Exception("This username already exists in the system");
                }
                await chinesesOctionContext.Users.AddAsync(user);
                await chinesesOctionContext.SaveChangesAsync();
                

            }
            catch (Exception ex) 
            {
                throw (ex);
            }
        }

    }
}
