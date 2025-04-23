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
    public class GymAttendanceService : IGymAttendanceService
    {
        private readonly IGymAttendanceRepository _gymAttendanceRepository;

        public GymAttendanceService(IGymAttendanceRepository gymAttendanceRepository)
        {
            _gymAttendanceRepository = gymAttendanceRepository;
        }

        public async Task<IEnumerable<GymAttendanceDto>> GetAllAsync()
        {
            var records = await _gymAttendanceRepository.GetAllAsync();
            return records.Select(r => new GymAttendanceDto
            {
                Id = r.Id,
                Date = r.Date
            });
        }

        public async Task<GymAttendanceDto?> GetByIdAsync(Guid id)
        {
            var record = await _gymAttendanceRepository.GetByIdAsync(id);
            if (record == null) return null;

            return new GymAttendanceDto
            {
                Id = record.Id,
                Date = record.Date
            };
        }

        public async Task AddAsync(GymAttendanceDto dto)
        {
            var entity = new GymAttendance
            {
                Id = Guid.NewGuid(),
                Date = dto.Date
            };

            await _gymAttendanceRepository.AddAsync(entity);
            await _gymAttendanceRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _gymAttendanceRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Gym attendance record not found");

            _gymAttendanceRepository.Delete(entity);
            await _gymAttendanceRepository.SaveChangesAsync();
        }
    }
}
