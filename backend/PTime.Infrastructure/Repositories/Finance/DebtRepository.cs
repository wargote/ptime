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
    public class DebtRepository : IDebtRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<Debt> _dbSet;

        public DebtRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<Debt>();
        }

        public async Task AddAsync(Debt entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(Debt entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<Debt>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Debt?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(Debt entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
