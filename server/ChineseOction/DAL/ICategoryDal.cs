using ChineseOction.Models;

namespace ChineseOction.DAL
{
    public interface ICategoryDal
    {
        Task<List<Category>> GetAllCategories();
    }
}