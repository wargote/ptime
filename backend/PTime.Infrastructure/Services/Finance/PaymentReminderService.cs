using PTime.Application.DTOs.Finance;
using PTime.Application.Interfaces.Repositories.Finance;
using PTime.Application.Interfaces.Services.Finance;
using PTime.Domain.Entities.Finance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Services.Finance
{
    public class PaymentReminderService : IPaymentReminderService
    {
        private readonly IPaymentReminderRepository _paymentReminderRepository;

        public PaymentReminderService(IPaymentReminderRepository paymentReminderRepository)
        {
            _paymentReminderRepository = paymentReminderRepository;
        }

        public async Task<IEnumerable<PaymentReminderDto>> GetAllAsync()
        {
            var entities = await _paymentReminderRepository.GetAllAsync();
            return entities.Select(e => new PaymentReminderDto
            {
                Id = e.Id,
                Title = e.Title,
                DueDate = e.DueDate,
                Notes = e.Notes,
                AlertSent = e.AlertSent
            });
        }

        public async Task<PaymentReminderDto?> GetByIdAsync(Guid id)
        {
            var entity = await _paymentReminderRepository.GetByIdAsync(id);
            if (entity == null) return null;

            return new PaymentReminderDto
            {
                Id = entity.Id,
                Title = entity.Title,
                DueDate = entity.DueDate,
                Notes = entity.Notes,
                AlertSent = entity.AlertSent
            };
        }

        public async Task AddAsync(PaymentReminderDto dto)
        {
            var entity = new PaymentReminder
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                DueDate = dto.DueDate,
                Notes = dto.Notes,
                AlertSent = dto.AlertSent
            };

            await _paymentReminderRepository.AddAsync(entity);
            await _paymentReminderRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(PaymentReminderDto dto)
        {
            var entity = await _paymentReminderRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Payment Reminder not found");

            entity.Title = dto.Title;
            entity.DueDate = dto.DueDate;
            entity.Notes = dto.Notes;
            entity.AlertSent = dto.AlertSent;

            _paymentReminderRepository.Update(entity);
            await _paymentReminderRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _paymentReminderRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Payment Reminder not found");

            _paymentReminderRepository.Delete(entity);
            await _paymentReminderRepository.SaveChangesAsync();
        }
    }
}
