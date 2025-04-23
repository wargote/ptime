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
    public class IncomeService : IIncomeService
    {
        private readonly IIncomeRepository _incomeRepository;

        public IncomeService(IIncomeRepository incomeRepository)
        {
            _incomeRepository = incomeRepository;
        }

        public async Task<IEnumerable<IncomeDto>> GetAllAsync()
        {
            var entities = await _incomeRepository.GetAllAsync();
            return entities.Select(e => new IncomeDto
            {
                Id = e.Id,
                Amount = e.Amount,
                Category = e.Category,
                Tags = e.Tags,
                Date = e.Date,
                Notes = e.Notes
            });
        }

        public async Task<IncomeDto?> GetByIdAsync(Guid id)
        {
            var entity = await _incomeRepository.GetByIdAsync(id);
            if (entity == null) return null;

            return new IncomeDto
            {
                Id = entity.Id,
                Amount = entity.Amount,
                Category = entity.Category,
                Tags = entity.Tags,
                Date = entity.Date,
                Notes = entity.Notes
            };
        }

        public async Task AddAsync(IncomeDto dto)
        {
            var entity = new Income
            {
                Id = Guid.NewGuid(),
                Amount = dto.Amount,
                Category = dto.Category,
                Tags = dto.Tags,
                Date = dto.Date,
                Notes = dto.Notes
            };

            await _incomeRepository.AddAsync(entity);
            await _incomeRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(IncomeDto dto)
        {
            var entity = await _incomeRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Income not found");

            entity.Amount = dto.Amount;
            entity.Category = dto.Category;
            entity.Tags = dto.Tags;
            entity.Date = dto.Date;
            entity.Notes = dto.Notes;

            _incomeRepository.Update(entity);
            await _incomeRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _incomeRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Income not found");

            _incomeRepository.Delete(entity);
            await _incomeRepository.SaveChangesAsync();
        }
    }
}
