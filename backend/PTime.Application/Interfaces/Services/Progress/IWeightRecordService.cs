using PTime.Application.DTOs.Progress;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Progress
{
    public interface IWeightRecordService
    {
        Task<IEnumerable<WeightRecordDto>> GetAllAsync();
        Task<WeightRecordDto?> GetByIdAsync(Guid id);
        Task AddAsync(WeightRecordDto dto);
        Task UpdateAsync(WeightRecordDto dto);
        Task DeleteAsync(Guid id);
    }
}
