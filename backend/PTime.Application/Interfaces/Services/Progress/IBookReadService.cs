using PTime.Application.DTOs.Progress;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Progress
{
    public interface IBookReadService
    {
        Task<IEnumerable<BookReadDto>> GetAllAsync();
        Task<BookReadDto?> GetByIdAsync(Guid id);
        Task AddAsync(BookReadDto dto);
        Task UpdateAsync(BookReadDto dto);
        Task DeleteAsync(Guid id);
    }
}
