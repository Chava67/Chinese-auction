using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ChineseOction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseService purchaseService;
        private readonly IMapper mapper;

        public PurchaseController(IPurchaseService purchaseService, IMapper mapper)
        {
            this.purchaseService = purchaseService;
            this.mapper = mapper;
        }

        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpGet("GetDetails")]
        public async Task<ActionResult<List<User>>> GetDetails()
        {
            var details = await purchaseService.GetDetails();
            if (details == null || !details.Any())
            {
                return NoContent();
            }
            return Ok(details);
        }
        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpGet("GetPurchaseByGift/{giftId}")]
        public async Task<ActionResult<List<PurchaseList>>> GetPurchaseByGift(int giftId)
        {
            var purchases = await purchaseService.GetPurchaseByGift(giftId);
            if (purchases == null || !purchases.Any())
            {
                return NoContent();
            }
            return Ok(purchases);
        }

        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpGet("SortByMaxPrice")]
        public async Task<ActionResult<List<PurchaseList>>> SortByMaxPrice()
        {
            var purchases = await purchaseService.SortByMaxPrice();
            if (purchases == null || !purchases.Any())
            {
                return NoContent();
            }
            return Ok(purchases);
        }

        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpGet("SortByMostPurchasedGift")]
        public async Task<ActionResult<List<PurchaseList>>> SortByMostPurchasedGift()
        {
            var purchases = await purchaseService.SortByMostPurchasedGift();
            if (purchases == null || !purchases.Any())
            {
                return NoContent();
            }
            return Ok(purchases);
        }

        [HttpPost]
        public async Task<ActionResult<Purchase>> PlaceOrder()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID in token.");
            }

            var purchase = await purchaseService.PlaceOrder(userId);
            if (purchase == null)
            {
                return BadRequest("Failed to place order.");
            }

            return Ok(purchase);
        }
    }
}
