using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;

namespace ChineseOction.DAL
{
    public class DonorDal : IDonorDal
    {
        private readonly ChinesesOctionContext chinesesOctionContext;

        public DonorDal(ChinesesOctionContext chinesesOctionContext)
        {
            this.chinesesOctionContext = chinesesOctionContext;
        }


        public async Task<List<Donor>> Get()
        {
            return await chinesesOctionContext.Donors.Include(g=>g.Gifts).ToListAsync();
        }
        public async Task<Donor >Add(Donor donor)
        {

            try
            {
                await chinesesOctionContext.Donors.AddAsync(donor);
                await chinesesOctionContext.SaveChangesAsync();
                return  donor; 
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }
        public async Task Remove(int id)
        {
            try
            {

                var donor = await chinesesOctionContext.Donors.Include(g=>g.Gifts).FirstOrDefaultAsync(c => c.Id == id);
                if (donor == null)
                {
                    throw new Exception($"customer {id} not found");
                }
                if (donor.Gifts.Count() !=0)
                {
                    throw new Exception($"this donor have a gifts");
                }
                
                chinesesOctionContext.Donors.Remove(donor);
               await chinesesOctionContext.SaveChangesAsync();
               
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<Donor> Update(Donor donor)
        {
            try
            {
                var result = await chinesesOctionContext.Donors.FirstOrDefaultAsync(c => c.Id==donor.Id);
            if (result != null)
            {
                
                    result.LastName = donor.LastName;
                    result.FirstName = donor.FirstName;
                    result.Mail = donor.Mail;
                    result.Phone = donor.Phone;
                    result.Picture= donor.Picture;
                    await chinesesOctionContext.SaveChangesAsync();
               
               
            }
            return  donor; }
             catch (Exception ex)
                {
                throw;
            }

        }
        public async Task<List<Gift>> GetAllDonations(int id)
        {
            try
            {
                var result = await chinesesOctionContext.Gifts.Where(g => g.DonorId == id).ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<List<Donor>>SearchByName(string name)
        {
            try
            {
                var donor = await chinesesOctionContext.Donors.Where(g => (g.FirstName+" "+g.LastName).Contains(name)).Include(g=>g.Gifts).ToListAsync();
                return donor;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Donor>> SearchByEmail(string email)
        {
            try
            {
                var donor = await chinesesOctionContext.Donors.Where(g => g.Mail.Contains(email)).Include(g=>g.Gifts).ToListAsync();
                return donor;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Donor>> SearchByGift(string gift)
        {
            try
            {
                var donors = await chinesesOctionContext.Gifts
                    .Where(g => g.Name.Contains(gift))
                    .Include(g => g.Donor)
                     .ThenInclude(d => d.Gifts)
                    .Select(g => g.Donor).Distinct()
                    .ToListAsync();

                return donors;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
