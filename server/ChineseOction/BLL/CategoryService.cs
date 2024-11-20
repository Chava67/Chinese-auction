using ChineseOction.DAL;
using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryDal categoryDal;

        public CategoryService(ICategoryDal categoryDal)
        {
            this.categoryDal = categoryDal;
        }
        public async Task<List<Category>> GetAllCategories()
        {
            List<Category> categories = await categoryDal.GetAllCategories();
            return categories;
        }
    }
}
