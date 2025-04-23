using PTime.Application.DTOs.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Common
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationDto>> GetAllAsync();
        Task<NotificationDto?> GetByIdAsync(Guid id);
        Task AddAsync(NotificationDto dto);
        Task UpdateAsync(NotificationDto dto);
        Task DeleteAsync(Guid id);
    }
}
