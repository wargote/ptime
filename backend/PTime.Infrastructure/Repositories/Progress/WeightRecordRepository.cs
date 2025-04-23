using Microsoft.EntityFrameworkCore;
using PTime.Application.Interfaces.Repositories.Progress;
using PTime.Domain.Entities.Progress;
using PTime.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Repositories.Progress
{
    public class WeightRecordRepository : IWeightRecordRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<WeightRecord> _dbSet;

        public WeightRecordRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<WeightRecord>();
        }

        public async Task AddAsync(WeightRecord entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(WeightRecord entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<WeightRecord>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<WeightRecord?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(WeightRecord entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
