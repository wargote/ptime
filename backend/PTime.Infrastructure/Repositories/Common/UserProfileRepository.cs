using Microsoft.EntityFrameworkCore;
using PTime.Application.Interfaces.Repositories.Common;
using PTime.Domain.Entities.Common;
using PTime.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Repositories.Common
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<UserProfile> _dbSet;

        public UserProfileRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<UserProfile>();
        }

        public async Task AddAsync(UserProfile entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(UserProfile entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<UserProfile>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<UserProfile?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(UserProfile entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
