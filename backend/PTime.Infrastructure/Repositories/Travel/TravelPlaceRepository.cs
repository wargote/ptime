using Microsoft.EntityFrameworkCore;
using PTime.Application.Interfaces.Repositories.Travel;
using PTime.Domain.Entities.Travel;
using PTime.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Repositories.Travel
{
    public class TravelPlaceRepository : ITravelPlaceRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<TravelPlace> _dbSet;

        public TravelPlaceRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<TravelPlace>();
        }

        public async Task AddAsync(TravelPlace entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(TravelPlace entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<TravelPlace>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<TravelPlace?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(TravelPlace entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
