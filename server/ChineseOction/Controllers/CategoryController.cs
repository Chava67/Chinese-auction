using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChineseOction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController: ControllerBase
    {
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;
        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            this.categoryService = categoryService;
            this.mapper = mapper;

        }

        [HttpGet]
        public async Task<List<Category>> GetGetAllCategories()
        {
            return await categoryService.GetAllCategories();
        }
    }
}
