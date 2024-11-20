using ChineseOction.DAL;
using ChineseOction.Models;
using Microsoft.IdentityModel.Tokens;

namespace ChineseOction.BLL
{
    public class DonorService : IDonorService
    {
        private readonly IDonorDal donorDal;

        public DonorService(IDonorDal donatesDal)
        {
            this.donorDal = donatesDal;
        }
        public async Task<List<Donor>> Get()
        {
            List<Donor> donates = await donorDal.Get();
            return  donates;
        }
        public async Task<Donor> Add(Donor donor)
        {
            //int id = int.Parse(donor.DonorName);
            //int digit, sum = 0;
            //int checksum = id % 10;
            //id /= 10;
            //for (int i = 0; i < 8; i++)
            //{
            //    digit = id % 10;
            //    id /= 10;
            //    if (i % 2==0)
            //        digit *= 2;
            //    if (digit > 9)
            //        digit = digit / 10 + digit % 10;
            //    sum += digit;
            //}
            //if ((10 - sum % 10) == checksum)
              
            return await donorDal.Add(donor);
            
           
        }
        public async Task Remove(int id)
        {
            await donorDal.Remove(id);
        }

        public async Task<Donor >Update(Donor donor)
        {
          return  await donorDal.Update(donor);
        }
        public async Task<List<Donor>> SearchByName(string name)
        {
            return await donorDal.SearchByName(name);
        }
        public async Task<List<Donor>> SearchByEmail(string email)
        {
            return await donorDal.SearchByEmail(email);
        }
        public async Task<List<Donor>> SearchByGift(string gift)
        {
            return await donorDal.SearchByGift(gift);
        }
    }
}
