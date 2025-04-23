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
    public class SavingGoalService : ISavingGoalService
    {
        private readonly ISavingGoalRepository _savingGoalRepository;

        public SavingGoalService(ISavingGoalRepository savingGoalRepository)
        {
            _savingGoalRepository = savingGoalRepository;
        }

        public async Task<IEnumerable<SavingGoalDto>> GetAllAsync()
        {
            var entities = await _savingGoalRepository.GetAllAsync();
            return entities.Select(e => new SavingGoalDto
            {
                Id = e.Id,
                Title = e.Title,
                TargetAmount = e.TargetAmount,
                SavedAmount = e.SavedAmount,
                Deadline = e.Deadline,
                Notes = e.Notes
            });
        }

        public async Task<SavingGoalDto?> GetByIdAsync(Guid id)
        {
            var entity = await _savingGoalRepository.GetByIdAsync(id);
            if (entity == null) return null;

            return new SavingGoalDto
            {
                Id = entity.Id,
                Title = entity.Title,
                TargetAmount = entity.TargetAmount,
                SavedAmount = entity.SavedAmount,
                Deadline = entity.Deadline,
                Notes = entity.Notes
            };
        }

        public async Task AddAsync(SavingGoalDto dto)
        {
            var entity = new SavingGoal
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                TargetAmount = dto.TargetAmount,
                SavedAmount = dto.SavedAmount,
                Deadline = dto.Deadline,
                Notes = dto.Notes
            };

            await _savingGoalRepository.AddAsync(entity);
            await _savingGoalRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(SavingGoalDto dto)
        {
            var entity = await _savingGoalRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Saving Goal not found");

            entity.Title = dto.Title;
            entity.TargetAmount = dto.TargetAmount;
            entity.SavedAmount = dto.SavedAmount;
            entity.Deadline = dto.Deadline;
            entity.Notes = dto.Notes;

            _savingGoalRepository.Update(entity);
            await _savingGoalRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _savingGoalRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Saving Goal not found");

            _savingGoalRepository.Delete(entity);
            await _savingGoalRepository.SaveChangesAsync();
        }
    }
}
