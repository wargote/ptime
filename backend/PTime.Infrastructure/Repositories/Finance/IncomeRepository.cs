using Microsoft.EntityFrameworkCore;
using PTime.Application.Interfaces.Repositories.Finance;
using PTime.Domain.Entities.Finance;
using PTime.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Repositories.Finance
{
    public class IncomeRepository : IIncomeRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<Income> _dbSet;

        public IncomeRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<Income>();
        }

        public async Task AddAsync(Income entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(Income entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<Income>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Income?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(Income entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
