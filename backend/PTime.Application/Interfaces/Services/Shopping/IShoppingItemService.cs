using PTime.Application.DTOs.Shopping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Services.Shopping
{
    public interface IShoppingItemService
    {
        Task<IEnumerable<ShoppingItemDto>> GetAllAsync();
        Task<ShoppingItemDto?> GetByIdAsync(Guid id);
        Task AddAsync(ShoppingItemDto itemDto);
        Task UpdateAsync(ShoppingItemDto itemDto);
        Task DeleteAsync(Guid id);
    }
}
