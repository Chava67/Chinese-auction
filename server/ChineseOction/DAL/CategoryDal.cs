using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;

namespace ChineseOction.DAL
{
    public class CategoryDal : ICategoryDal
    {
        private readonly ChinesesOctionContext chinesesOctionContext;

        public CategoryDal(ChinesesOctionContext chinesesOctionContext)
        {
            this.chinesesOctionContext = chinesesOctionContext;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await chinesesOctionContext.Categories.ToListAsync();

        }
    }
}
