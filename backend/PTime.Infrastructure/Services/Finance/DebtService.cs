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
    public class DebtService : IDebtService
    {
        private readonly IDebtRepository _debtRepository;

        public DebtService(IDebtRepository debtRepository)
        {
            _debtRepository = debtRepository;
        }

        public async Task<IEnumerable<DebtDto>> GetAllAsync()
        {
            var entities = await _debtRepository.GetAllAsync();
            return entities.Select(e => new DebtDto
            {
                Id = e.Id,
                Description = e.Description,
                TotalAmount = e.TotalAmount,
                PaidAmount = e.PaidAmount,
                DueDate = e.DueDate,
                Status = e.Status
            });
        }

        public async Task<DebtDto?> GetByIdAsync(Guid id)
        {
            var entity = await _debtRepository.GetByIdAsync(id);
            if (entity == null) return null;

            return new DebtDto
            {
                Id = entity.Id,
                Description = entity.Description,
                TotalAmount = entity.TotalAmount,
                PaidAmount = entity.PaidAmount,
                DueDate = entity.DueDate,
                Status = entity.Status
            };
        }

        public async Task AddAsync(DebtDto dto)
        {
            var entity = new Debt
            {
                Id = Guid.NewGuid(),
                Description = dto.Description,
                TotalAmount = dto.TotalAmount,
                PaidAmount = dto.PaidAmount,
                DueDate = dto.DueDate,
                Status = dto.Status
            };

            await _debtRepository.AddAsync(entity);
            await _debtRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(DebtDto dto)
        {
            var entity = await _debtRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Debt not found");

            entity.Description = dto.Description;
            entity.TotalAmount = dto.TotalAmount;
            entity.PaidAmount = dto.PaidAmount;
            entity.DueDate = dto.DueDate;
            entity.Status = dto.Status;

            _debtRepository.Update(entity);
            await _debtRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _debtRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Debt not found");

            _debtRepository.Delete(entity);
            await _debtRepository.SaveChangesAsync();
        }
    }
}
