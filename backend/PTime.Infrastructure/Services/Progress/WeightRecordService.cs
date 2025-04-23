using PTime.Application.DTOs.Progress;
using PTime.Application.Interfaces.Repositories.Progress;
using PTime.Application.Interfaces.Services.Progress;
using PTime.Domain.Entities.Progress;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Services.Progress
{
    public class WeightRecordService : IWeightRecordService
    {
        private readonly IWeightRecordRepository _weightRecordRepository;

        public WeightRecordService(IWeightRecordRepository weightRecordRepository)
        {
            _weightRecordRepository = weightRecordRepository;
        }

        public async Task<IEnumerable<WeightRecordDto>> GetAllAsync()
        {
            var records = await _weightRecordRepository.GetAllAsync();
            return records.Select(r => new WeightRecordDto
            {
                Id = r.Id,
                Date = r.Date,
                Weight = r.Weight
            });
        }

        public async Task<WeightRecordDto?> GetByIdAsync(Guid id)
        {
            var record = await _weightRecordRepository.GetByIdAsync(id);
            if (record == null) return null;

            return new WeightRecordDto
            {
                Id = record.Id,
                Date = record.Date,
                Weight = record.Weight
            };
        }

        public async Task AddAsync(WeightRecordDto dto)
        {
            var entity = new WeightRecord
            {
                Id = Guid.NewGuid(),
                Date = dto.Date,
                Weight = dto.Weight
            };

            await _weightRecordRepository.AddAsync(entity);
            await _weightRecordRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(WeightRecordDto dto)
        {
            var entity = await _weightRecordRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Weight record not found");

            entity.Date = dto.Date;
            entity.Weight = dto.Weight;

            _weightRecordRepository.Update(entity);
            await _weightRecordRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _weightRecordRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Weight record not found");

            _weightRecordRepository.Delete(entity);
            await _weightRecordRepository.SaveChangesAsync();
        }
    }
}
