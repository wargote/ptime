using PTime.Application.DTOs.Finance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Finance
{
    public interface ILoanService
    {
        Task<IEnumerable<LoanDto>> GetAllAsync();
        Task<LoanDto?> GetByIdAsync(Guid id);
        Task AddAsync(LoanDto loanDto);
        Task UpdateAsync(LoanDto loanDto);
        Task DeleteAsync(Guid id);
    }
}
