using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;

namespace ChineseOction.DAL
{
    public class ChinesesOctionContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Gift> Gifts { get; set; }

        public DbSet<Purchase> Purchases { get; set; }
        //public DbSet<Permission> Permissions { get; set; }
        public DbSet<PurchaseList> PurchaseLists { get; set; }
        public DbSet<Donor> Donors { get; set; }
        public DbSet<Winner> Winners { get; set; }
        public DbSet<Cart> Carts { get; set; }




        public ChinesesOctionContext(DbContextOptions<ChinesesOctionContext> contextOptions) : base(contextOptions)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(c => c.Id).UseIdentityColumn(100, 1);
            modelBuilder.Entity<Category>().Property(c => c.Id).UseIdentityColumn(100, 1);
            modelBuilder.Entity<Gift>().Property(c => c.Id).UseIdentityColumn(100, 1);
            modelBuilder.Entity<Purchase>().Property(c => c.Id).UseIdentityColumn(100, 1);
            modelBuilder.Entity<PurchaseList>().Property(c => c.Id).UseIdentityColumn(100, 1);
            modelBuilder.Entity<Winner>().Property(c => c.Id).UseIdentityColumn(100, 1);
            modelBuilder.Entity<Donor>().Property(c => c.Id).UseIdentityColumn(100, 1);
            modelBuilder.Entity<Cart>().Property(c => c.Id).UseIdentityColumn(100, 1);




            base.OnModelCreating(modelBuilder);
        }

        /*        internal Task SaveChangesAsync()
                {
                    throw new NotImplementedException();
                }*/
    }
}
