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
    public class GymAttendanceRepository : IGymAttendanceRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<GymAttendance> _dbSet;

        public GymAttendanceRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<GymAttendance>();
        }

        public async Task AddAsync(GymAttendance entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(GymAttendance entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<GymAttendance>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<GymAttendance?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(GymAttendance entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
