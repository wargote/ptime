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
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<Expense> _dbSet;

        public ExpenseRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<Expense>();
        }

        public async Task AddAsync(Expense entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(Expense entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<Expense>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Expense?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(Expense entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
