using PTime.Application.DTOs.Finance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Finance
{
    public interface IDebtService
    {
        Task<IEnumerable<DebtDto>> GetAllAsync();
        Task<DebtDto?> GetByIdAsync(Guid id);
        Task AddAsync(DebtDto debtDto);
        Task UpdateAsync(DebtDto debtDto);
        Task DeleteAsync(Guid id);
    }
}
