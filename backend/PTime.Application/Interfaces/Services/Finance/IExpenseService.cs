using PTime.Application.DTOs.Finance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Finance
{
    public interface IExpenseService
    {
        Task<IEnumerable<ExpenseDto>> GetAllAsync();
        Task<ExpenseDto?> GetByIdAsync(Guid id);
        Task AddAsync(ExpenseDto expenseDto);
        Task UpdateAsync(ExpenseDto expenseDto);
        Task DeleteAsync(Guid id);
    }
}
