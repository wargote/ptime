using PTime.Application.DTOs.Shopping;
using PTime.Application.Interfaces.Repositories.Shopping;
using PTime.Application.Interfaces.Services.Shopping;
using PTime.Domain.Entities.Shopping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Services.Shopping
{
    public class ShoppingItemService : IShoppingItemService
    {
        private readonly IShoppingItemRepository _shoppingItemRepository;

        public ShoppingItemService(IShoppingItemRepository shoppingItemRepository)
        {
            _shoppingItemRepository = shoppingItemRepository;
        }

        public async Task<IEnumerable<ShoppingItemDto>> GetAllAsync()
        {
            var items = await _shoppingItemRepository.GetAllAsync();
            return items.Select(e => new ShoppingItemDto
            {
                Id = e.Id,
                Name = e.Name,
                Category = e.Category,
                Status = e.Status,
                CreatedDate = e.CreatedDate,
                Notes = e.Notes
            });
        }

        public async Task<ShoppingItemDto?> GetByIdAsync(Guid id)
        {
            var item = await _shoppingItemRepository.GetByIdAsync(id);
            if (item == null) return null;

            return new ShoppingItemDto
            {
                Id = item.Id,
                Name = item.Name,
                Category = item.Category,
                Status = item.Status,
                CreatedDate = item.CreatedDate,
                Notes = item.Notes
            };
        }

        public async Task AddAsync(ShoppingItemDto dto)
        {
            var entity = new ShoppingItem
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Category = dto.Category,
                Status = dto.Status,
                CreatedDate = dto.CreatedDate,
                Notes = dto.Notes
            };

            await _shoppingItemRepository.AddAsync(entity);
            await _shoppingItemRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(ShoppingItemDto dto)
        {
            var entity = await _shoppingItemRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Shopping item not found");

            entity.Name = dto.Name;
            entity.Category = dto.Category;
            entity.Status = dto.Status;
            entity.CreatedDate = dto.CreatedDate;
            entity.Notes = dto.Notes;

            _shoppingItemRepository.Update(entity);
            await _shoppingItemRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _shoppingItemRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Shopping item not found");

            _shoppingItemRepository.Delete(entity);
            await _shoppingItemRepository.SaveChangesAsync();
        }
    }
}
