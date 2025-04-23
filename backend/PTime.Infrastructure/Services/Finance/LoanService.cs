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
    public class LoanService : ILoanService
    {
        private readonly ILoanRepository _loanRepository;

        public LoanService(ILoanRepository loanRepository)
        {
            _loanRepository = loanRepository;
        }

        public async Task<IEnumerable<LoanDto>> GetAllAsync()
        {
            var entities = await _loanRepository.GetAllAsync();
            return entities.Select(e => new LoanDto
            {
                Id = e.Id,
                Amount = e.Amount,
                Type = e.Type,
                Description = e.Description,
                DueDate = e.DueDate,
                Status = e.Status
            });
        }

        public async Task<LoanDto?> GetByIdAsync(Guid id)
        {
            var entity = await _loanRepository.GetByIdAsync(id);
            if (entity == null) return null;

            return new LoanDto
            {
                Id = entity.Id,
                Amount = entity.Amount,
                Type = entity.Type,
                Description = entity.Description,
                DueDate = entity.DueDate,
                Status = entity.Status
            };
        }

        public async Task AddAsync(LoanDto dto)
        {
            var entity = new Loan
            {
                Id = Guid.NewGuid(),
                Amount = dto.Amount,
                Type = dto.Type,
                Description = dto.Description,
                DueDate = dto.DueDate,
                Status = dto.Status
            };

            await _loanRepository.AddAsync(entity);
            await _loanRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(LoanDto dto)
        {
            var entity = await _loanRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Loan not found");

            entity.Amount = dto.Amount;
            entity.Type = dto.Type;
            entity.Description = dto.Description;
            entity.DueDate = dto.DueDate;
            entity.Status = dto.Status;

            _loanRepository.Update(entity);
            await _loanRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _loanRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Loan not found");

            _loanRepository.Delete(entity);
            await _loanRepository.SaveChangesAsync();
        }
    }
}
