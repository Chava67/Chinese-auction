using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.DAL;
using ChineseOction.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ChineseOction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaffleController : ControllerBase
    {
        private readonly IRaffleService raffleService;
        private readonly IMapper mapper;

        public RaffleController(IRaffleService raffleService, IMapper mapper)
        {
            this.raffleService = raffleService;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Winner>>> GetWinners()
        {
            return await raffleService.GetWinners();
        }
        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpPost("{giftId}")]
        public async Task <ActionResult<Winner>>  GiftRaffle(int giftId)
        {
            var a = await raffleService.GiftRaffle(giftId);
            return Ok(a);
        }
        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpGet("ReportOfIncome")]
        public async Task <ActionResult<List<GiftIncomeReport>> > ReportOfIncome()
        {
            var report = await raffleService.ReportOfIncome();
            return Ok(report);
        }
        [Authorize(Roles = nameof(Permission.MANAGER))]
        [HttpGet("ReportOfWinners")]
        public async Task <ActionResult<List<Winner>>>  ReportOfWinners()
        {
            var report= await raffleService.ReportOfWinners();
            return Ok(report);                          
        }
    }                     
}