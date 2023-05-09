using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class InventoryContext : DbContext
    {
        public DbSet<Inventory> Inventories { get; set; }
        public InventoryContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Inventory>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Inventory>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Inventory>()
                .HasIndex(x => x.Location);

            modelBuilder.Entity<Inventory>()
                .HasIndex(x => x.Name);

            modelBuilder.Entity<Inventory>()
                .HasIndex(x => x.Price);
        }

    }
}
