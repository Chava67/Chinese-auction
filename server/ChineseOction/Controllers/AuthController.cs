using ChineseOction.BLL;
using ChineseOction.DAL;
using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;


namespace ChineseOction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly IMapper mapper;

        public AuthController(IAuthService userService, IMapper mapper)
        {
            this.authService = userService;
            this.mapper=mapper;
        }

        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            return await authService.GetAllUsers();
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            return Ok(await authService.Login(loginDto)); 
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            var user = mapper.Map<User>(userDto);
            await authService.Register(user);

            return Ok();
        }


    }
}
