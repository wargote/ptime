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
    public class NotificationRepository : INotificationRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<Notification> _dbSet;

        public NotificationRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<Notification>();
        }

        public async Task AddAsync(Notification entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(Notification entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<Notification>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Notification?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(Notification entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
