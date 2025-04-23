using PTime.Application.DTOs.Finance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Finance
{
    public interface ISavingGoalService
    {
        Task<IEnumerable<SavingGoalDto>> GetAllAsync();
        Task<SavingGoalDto?> GetByIdAsync(Guid id);
        Task AddAsync(SavingGoalDto goalDto);
        Task UpdateAsync(SavingGoalDto goalDto);
        Task DeleteAsync(Guid id);
    }
}
