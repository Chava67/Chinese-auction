using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ChineseOction.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService cartService;
        private readonly IMapper mapper;

        public CartController(ICartService cartService, IMapper mapper)
        {
            this.cartService = cartService;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cart>>> GetCart()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID in token");
            }

            var cart = await cartService.GetCart(userId);

            if (cart == null || !cart.Any())
            {
                return NoContent(); 
            }

            return Ok(cart); 
        }

        [HttpPost("{giftId}/{quantity}")]
        public async Task<ActionResult<int>> AddToCart(int giftId, int quantity)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID in token");
            }

            var result = await cartService.AddToCart(userId, giftId, quantity);
            return Ok(result); 
        }

      
        [HttpPut("Increas/{giftId}")]
        public async Task<ActionResult<int>> Increase(int giftId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID in token");
            }

            
            return Ok(await cartService.Increas(userId,giftId)); 
        }

        
        [HttpPut("Reduce/{giftId}")]
        public async Task<ActionResult<int>> Reduce(int giftId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID in token");
            }

            var result = await cartService.Reduce(userId, giftId);
            return Ok(result); 
        }

        [HttpDelete("{giftId}")]
        public async Task<ActionResult<int>> RemoveFromCart(int giftId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID in token");
            }

            var result = await cartService.RemoveFromCart(userId, giftId);
            return Ok(result); 
        }
    }
}
