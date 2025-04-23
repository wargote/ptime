using Microsoft.EntityFrameworkCore;
using PTime.Application.Interfaces.Repositories.Goals;
using PTime.Domain.Entities.Goals;
using PTime.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Repositories.Goals
{
    public class TaskItemRepository : ITaskItemRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<TaskItem> _dbSet;

        public TaskItemRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<TaskItem>();
        }

        public async Task AddAsync(TaskItem entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(TaskItem entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(TaskItem entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
