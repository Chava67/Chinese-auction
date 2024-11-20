using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategories();
    }
}