using PTime.Application.DTOs.Finance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Finance
{
    public interface IIncomeService
    {
        Task<IEnumerable<IncomeDto>> GetAllAsync();
        Task<IncomeDto?> GetByIdAsync(Guid id);
        Task AddAsync(IncomeDto incomeDto);
        Task UpdateAsync(IncomeDto incomeDto);
        Task DeleteAsync(Guid id);
    }
}
