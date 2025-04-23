using PTime.Application.DTOs.Finance;
using PTime.Application.DTOs.Progress;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Progress
{
    public interface IGymAttendanceService
    {
        Task<IEnumerable<GymAttendanceDto>> GetAllAsync();
        Task<GymAttendanceDto?> GetByIdAsync(Guid id);
        Task AddAsync(GymAttendanceDto dto);
        Task DeleteAsync(Guid id);
    }
}
