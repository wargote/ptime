using Microsoft.EntityFrameworkCore;
using PTime.Application.Interfaces.Repositories.Shopping;
using PTime.Domain.Entities.Shopping;
using PTime.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Repositories.Shopping
{
    public class ShoppingItemRepository : IShoppingItemRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<ShoppingItem> _dbSet;

        public ShoppingItemRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<ShoppingItem>();
        }

        public async Task AddAsync(ShoppingItem entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(ShoppingItem entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<ShoppingItem>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<ShoppingItem?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(ShoppingItem entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
