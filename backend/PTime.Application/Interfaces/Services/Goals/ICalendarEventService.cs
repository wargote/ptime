using PTime.Application.DTOs.Goals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Goals
{
    public interface ICalendarEventService
    {
        Task<IEnumerable<CalendarEventDto>> GetAllAsync();
        Task<CalendarEventDto?> GetByIdAsync(Guid id);
        Task AddAsync(CalendarEventDto dto);
        Task UpdateAsync(CalendarEventDto dto);
        Task DeleteAsync(Guid id);
    }
}
