using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace ChineseOction.DAL
{
    public class PurchaseDal : IPurchaseDal
    {
        private readonly ChinesesOctionContext chinesesOctionContext;

        public PurchaseDal(ChinesesOctionContext chinesesOctionContext)
        {
            this.chinesesOctionContext = chinesesOctionContext;
        }
        public async Task<List<PurchaseList>> GetPurchaseByGift(int giftId)
        {
            try
            {
                var purchase = await chinesesOctionContext.PurchaseLists.Include(g=>g.Gift).Include(p=>p.Purchase).ThenInclude(c=>c.Customer)
                                    .Where(g => g.GiftId == giftId).ToListAsync();
                return purchase;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public async Task<List<PurchaseList>> SortByMaxPrice()
        {
            try
            {
                var purchase = await chinesesOctionContext.PurchaseLists
                                    .Include(g => g.Gift)
                                    .OrderByDescending(g => g.Gift.Price)
                                    .ToListAsync();
                return purchase;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public async Task<List<PurchaseList>> SortByMostPurchasedGift()
        {
            try
            {
                var purchases = await chinesesOctionContext.PurchaseLists
                                     .GroupBy(p => p.Gift)
                                     .Select(g => new
                                     {
                                         Gift = g.Key,
                                         TotalQuantity = g.Sum(p => p.Quantity)
                                     })
                                     .OrderByDescending(g => g.TotalQuantity)
                                     .Select(g => new PurchaseList
                                     {
                                         Gift = g.Gift,
                                         Quantity = g.TotalQuantity
                                     })
                                     .ToListAsync();

                return purchases;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<User>> GetDetails()
        {
            try
            {
                var purchase = await chinesesOctionContext.Purchases
                                    .Include(p => p.Customer)
                                    .Select(u => u.Customer)
                                    .Distinct()
                                    .ToListAsync();
                return purchase;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public async Task<Purchase> PlaceOrder(int userId)
        {
            try
            {
                var cart = await chinesesOctionContext.Carts.Where(c => c.UserId == userId).ToListAsync();
                Purchase purchase = new Purchase
                {
                    CustomerId = userId, 
                    Date = DateTime.Now
                };
                await chinesesOctionContext.Purchases.AddAsync(purchase);
                await chinesesOctionContext.SaveChangesAsync();

                var purchaseId = await chinesesOctionContext.Purchases.Where(p => p .CustomerId==userId & p.Date==purchase.Date).Select(p => p.Id)
                .FirstOrDefaultAsync();
                foreach (var item in cart)
                {
                    PurchaseList purchaseList = new PurchaseList
                    {
                        PurchaseId = purchaseId,
                        Quantity = item.Quantity,
                        GiftId = item.GiftId

                    };
                    chinesesOctionContext.PurchaseLists.AddAsync(purchaseList);
                    chinesesOctionContext.Carts.Remove(item);
                  
                }
                await chinesesOctionContext.SaveChangesAsync();

                return purchase;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }

}
