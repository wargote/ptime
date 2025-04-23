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
    public class CalendarEventRepository : ICalendarEventRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<CalendarEvent> _dbSet;

        public CalendarEventRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<CalendarEvent>();
        }

        public async Task AddAsync(CalendarEvent entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(CalendarEvent entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<CalendarEvent>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<CalendarEvent?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(CalendarEvent entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
