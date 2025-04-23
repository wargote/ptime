using PTime.Application.DTOs.Finance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Finance
{
    public interface IPaymentReminderService
    {
        Task<IEnumerable<PaymentReminderDto>> GetAllAsync();
        Task<PaymentReminderDto?> GetByIdAsync(Guid id);
        Task AddAsync(PaymentReminderDto reminderDto);
        Task UpdateAsync(PaymentReminderDto reminderDto);
        Task DeleteAsync(Guid id);
    }
}
