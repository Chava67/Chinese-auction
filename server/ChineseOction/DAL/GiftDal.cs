using AutoMapper.QueryableExtensions;
using ChineseOction.Controllers;
using ChineseOction.Migrations;
using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ChineseOction.DAL
{
    public class GiftDal : IGiftDal
    {
        private readonly ChinesesOctionContext chinesesOctionContext;

        public GiftDal(ChinesesOctionContext chinesesOctionContext)
        {
            this.chinesesOctionContext = chinesesOctionContext;
        }

        public async Task<List<Gift>> GetAllGifts()
        {
            return await chinesesOctionContext.Gifts.Include(d => d.Donor).Include(c => c.Category).ToListAsync();

        }
        public async Task<List<Gift>> GetAllCategories()
        {
            return await chinesesOctionContext.Gifts.Include(d => d.Donor).Include(c => c.Category).ToListAsync();

        }

        public async Task<Gift> AddGift(Gift gift)
        {
            try
            {
                await chinesesOctionContext.Gifts.AddAsync(gift);
                await chinesesOctionContext.SaveChangesAsync();
                return gift;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Gift> UpdateGift(Gift gift)
        {
            try
            {
                var result = await chinesesOctionContext.Gifts.FirstOrDefaultAsync(g => g.Id == gift.Id);
                if (result != null)
                {
                    result.Name = gift.Name;
                    result.Picture = gift.Picture;
                    result.Price = gift.Price;
                    result.DonorId = gift.DonorId;
                    result.CategoryId = gift.CategoryId;
                    await chinesesOctionContext.SaveChangesAsync();
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeleteGift(int id)
        {
            try
            {
                var result = await chinesesOctionContext.Gifts.FirstOrDefaultAsync(g => g.Id == id);

                if (result == null)
                {
                    throw new Exception($"gift {id} not found");
                }
                var tmp = await chinesesOctionContext.PurchaseLists.Include(p => p.Purchase).Where(p => p.GiftId == id && p.Purchase!=null).ToListAsync();
                if (!tmp.IsNullOrEmpty())
                {
                    throw new Exception($"This gift already has purchases");
                }
                chinesesOctionContext.Gifts.Remove(result);
                await chinesesOctionContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Donor>> GetDonorByGiftId(int id)
        {
            try
            {
                var donor = await chinesesOctionContext.Gifts.Include(g => g.Donor).Where(d => d.Id == id).Select(a => a.Donor).ToListAsync();
                //var  = await chinesesOctionContext.Donors.FirstOrDefaultAsync(d => d.Id == gift.DonorId);
                return donor;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Gift>> SearchGiftByName(string name)
        {
            try
            {
                var gift = await chinesesOctionContext.Gifts.Where(g => g.Name == name).ToListAsync();
                return gift;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Gift>> SearchGiftByDonor(string name)
        {
            try
            {
                var gift = await chinesesOctionContext.Gifts.Include(d => d.Donor).Where(g => g.Donor.FirstName + " " + g.Donor.LastName == name).ToListAsync();
                return gift;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Gift>> SearchGiftByNumPurch(int num)
        {
            try
            {
                if (num == 0)
                {
                    var query = await chinesesOctionContext.Gifts.Include(d => d.Donor)
                    .Include(p => p.Category)
                            .Where(g => !chinesesOctionContext.PurchaseLists
                            .Include(p => p.Purchase)

                            .GroupBy(pl => pl.GiftId)
                            .Select(g => g.Key)
                            .Contains(g.Id)).ToListAsync();

                    return query;
                }
                else
                {
                    var query = await chinesesOctionContext.Gifts
                   .Include(d => d.Donor)
                   .Include(p => p.Category)
                   .Where(g => chinesesOctionContext.PurchaseLists
                   .Include(p => p.Purchase)
                   
                    .GroupBy(pl => pl.GiftId)
                    .Where(g => g.Sum(x => x.Quantity) == num)
                    .Select(g => g.Key)
                    .Contains(g.Id)).ToListAsync();
                    return query;
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Gift>> SortByCategory()
        {
            return await chinesesOctionContext.Gifts.Include(c => c.Category).OrderBy(g => g.Category.Name).ToListAsync();




        }
        public async Task<List<Gift>> SortByPrice()
        {
            return await chinesesOctionContext.Gifts.Include(c => c.Category).OrderBy(g => g.Price).ToListAsync();
        }
    }
}
