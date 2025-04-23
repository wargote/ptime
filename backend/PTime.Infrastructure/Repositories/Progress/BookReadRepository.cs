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
    public class BookReadRepository : IBookReadRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<BookRead> _dbSet;

        public BookReadRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<BookRead>();
        }

        public async Task AddAsync(BookRead entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(BookRead entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<BookRead>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<BookRead?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(BookRead entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
