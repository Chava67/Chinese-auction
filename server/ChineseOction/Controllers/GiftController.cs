using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.DAL;
using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ChineseOction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GiftController : ControllerBase
    {

        private readonly IGiftService giftsService;
        private readonly IMapper mapper;
        public GiftController(IGiftService giftsService, IMapper mapper)
        {
            this.giftsService = giftsService;
            this.mapper = mapper;

        }

        [HttpGet]
        public async Task<List<Gift>> GetAllGifts()
        {
            return await giftsService.GetAllGifts();
        }

        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpPost]
        public async Task<ActionResult<Gift>> Add(GiftDto giftDto)
        {
            var gift = mapper.Map<Gift>(giftDto);

            return await giftsService.AddGift(gift);
        }
        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpDelete("{id}")]
        public async Task Remove(int id)
        {
            await giftsService.DeleteGift(id);
        }
        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpPut]
        public async Task<Gift> Update(UpdateGiftDto giftDto)
        {
            var gift = mapper.Map<Gift>(giftDto);

            return await giftsService.UpdateGift(gift);
        }
        [HttpGet("GetDonorsByGiftId/{id}")]
        public async Task<List<Donor>> GetDonorByGiftId(int id)
        {
            return await giftsService.GetDonorByGiftId(id);
        }
        [HttpGet("SearchGiftByName/{name}")]
        public async Task<List<Gift>> SearchGiftByName(string name)
        {
            return await giftsService.SearchGiftByName(name);
        }
        [HttpGet("SearchGiftByDonor/{name}")]
        public async Task<List<Gift>> SearchGiftByDonor(string name)
        {
            return await giftsService.SearchGiftByDonor(name);
        }
        [HttpGet("SearchGiftByQuantity/{num}")]
        public async Task<List<Gift>> SearchGiftByNumPurch(int num)
        {
            return await giftsService.SearchGiftByNumPurch(num);
        }
        [HttpGet("SortBycategory")]
        public async Task<List<Gift>> SortBycategory()
        {
            return await giftsService.SortByCategory();
        }
        [HttpGet("SortByPrice")]
        public async Task<List<Gift>> SortByPrice()
        {
            return await giftsService.SortByPrice();
        }
    }
}

 

