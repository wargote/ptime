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
    public class SavingGoalRepository : ISavingGoalRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<SavingGoal> _dbSet;

        public SavingGoalRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<SavingGoal>();
        }

        public async Task AddAsync(SavingGoal entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(SavingGoal entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<SavingGoal>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<SavingGoal?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(SavingGoal entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
