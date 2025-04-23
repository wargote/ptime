using PTime.Application.DTOs.Goals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Goals
{
    public interface ITaskItemService
    {
        Task<IEnumerable<TaskItemDto>> GetAllAsync();
        Task<TaskItemDto?> GetByIdAsync(Guid id);
        Task AddAsync(TaskItemDto dto);
        Task UpdateAsync(TaskItemDto dto);
        Task DeleteAsync(Guid id);
    }
}
