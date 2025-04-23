using PTime.Application.DTOs.Travel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Travel
{
    public interface ITravelPlaceService
    {
        Task<IEnumerable<TravelPlaceDto>> GetAllAsync();
        Task<TravelPlaceDto?> GetByIdAsync(Guid id);
        Task AddAsync(TravelPlaceDto dto);
        Task UpdateAsync(TravelPlaceDto dto);
        Task DeleteAsync(Guid id);
    }
}
