using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChineseOction.Controllers
{
    [ApiController]
    [Authorize(Roles = nameof(Permission.MANAGER))]  
    [Route("api/[controller]")]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService donatesService;
        private readonly IMapper mapper;

        public DonorController(IDonorService donatesService, IMapper mapper)
        {
            this.donatesService = donatesService;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Donor>>> Get()
        {
            var donors = await donatesService.Get();
            if (donors == null || !donors.Any())
            {
                return NoContent(); 
            }
            return Ok(donors); 
        }

        [HttpPost]
        public async Task<ActionResult<Donor>> Add(DonorDto donorDto)
        {
            var donor = mapper.Map<Donor>(donorDto);
            var result = await donatesService.Add(donor);
            if (result == null)
            {
                return BadRequest("Failed to add donor."); 
            }
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(int id)
        {
             await donatesService.Remove(id);
          
            return NoContent(); 
        }

        [HttpPut]
        public async Task<ActionResult<Donor>> Update(UpdateDonorDto donorDto)
        {
            var donor = mapper.Map<Donor>(donorDto);
            var result = await donatesService.Update(donor);
            if (result == null)
            {
                return BadRequest("Failed to update donor."); 
            }
            return Ok(result); 
        }

        [HttpGet("SearchByName/{name}")]
        public async Task<ActionResult<List<Donor>>> SearchByName(string name)
        {
            var donors = await donatesService.SearchByName(name);
            if (donors == null || !donors.Any())
            {
                return NoContent(); 
            }
            return Ok(donors); 
        }

        [HttpGet("SearchByEmail/{email}")]
        public async Task<ActionResult<List<Donor>>> SearchByEmail(string email)
        {
            var donors = await donatesService.SearchByEmail(email);
            if (donors == null || !donors.Any())
            {
                return NoContent(); 
            }
            return Ok(donors); 
        }

        [HttpGet("SearchByGift/{gift}")]
        public async Task<ActionResult<List<Donor>>> SearchByGift(string gift)
        {
            var donors = await donatesService.SearchByGift(gift);
            if (donors == null || !donors.Any())
            {
                return NoContent(); 
            }
            return Ok(donors); 
        }
    }
}
