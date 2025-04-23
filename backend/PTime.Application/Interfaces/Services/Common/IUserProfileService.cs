using PTime.Application.DTOs.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Common
{
    public interface IUserProfileService
    {
        Task<IEnumerable<UserProfileDto>> GetAllAsync();
        Task<UserProfileDto?> GetByIdAsync(Guid id);
        Task AddAsync(UserProfileDto dto);
        Task UpdateAsync(UserProfileDto dto);
        Task DeleteAsync(Guid id);
    }
}
