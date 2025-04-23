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
    public class LoanRepository : ILoanRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<Loan> _dbSet;

        public LoanRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<Loan>();
        }

        public async Task AddAsync(Loan entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(Loan entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<Loan>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Loan?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(Loan entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
