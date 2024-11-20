using ChineseOction.DAL;
using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public interface IDonorService
    {
       Task< List<Donor> >Get();
        Task<Donor> Add(Donor donor);
        Task Remove(int id);
        Task<Donor> Update(Donor donor);
        Task<List<Donor>> SearchByName(string name);
        Task<List<Donor>> SearchByEmail(string email);
        Task<List<Donor>> SearchByGift(string gift);
        
    }
}