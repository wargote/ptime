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
    public class PaymentReminderRepository : IPaymentReminderRepository
    {
        private readonly PTimeDbContext _context;
        private readonly DbSet<PaymentReminder> _dbSet;

        public PaymentReminderRepository(PTimeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<PaymentReminder>();
        }

        public async Task AddAsync(PaymentReminder entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(PaymentReminder entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<PaymentReminder>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<PaymentReminder?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(PaymentReminder entity)
        {
            _dbSet.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
