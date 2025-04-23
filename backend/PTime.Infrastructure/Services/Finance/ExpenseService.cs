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
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseService(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        public async Task<IEnumerable<ExpenseDto>> GetAllAsync()
        {
            var entities = await _expenseRepository.GetAllAsync();
            return entities.Select(e => new ExpenseDto
            {
                Id = e.Id,
                Amount = e.Amount,
                Category = e.Category,
                Tags = e.Tags,
                Date = e.Date,
                Notes = e.Notes
            });
        }

        public async Task<ExpenseDto?> GetByIdAsync(Guid id)
        {
            var entity = await _expenseRepository.GetByIdAsync(id);
            if (entity == null) return null;

            return new ExpenseDto
            {
                Id = entity.Id,
                Amount = entity.Amount,
                Category = entity.Category,
                Tags = entity.Tags,
                Date = entity.Date,
                Notes = entity.Notes
            };
        }

        public async Task AddAsync(ExpenseDto dto)
        {
            var entity = new Expense
            {
                Id = Guid.NewGuid(),
                Amount = dto.Amount,
                Category = dto.Category,
                Tags = dto.Tags,
                Date = dto.Date,
                Notes = dto.Notes
            };

            await _expenseRepository.AddAsync(entity);
            await _expenseRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(ExpenseDto dto)
        {
            var entity = await _expenseRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Expense not found");

            entity.Amount = dto.Amount;
            entity.Category = dto.Category;
            entity.Tags = dto.Tags;
            entity.Date = dto.Date;
            entity.Notes = dto.Notes;

            _expenseRepository.Update(entity);
            await _expenseRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _expenseRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Expense not found");

            _expenseRepository.Delete(entity);
            await _expenseRepository.SaveChangesAsync();
        }
    }
}
