using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTime.API.Extensions;
using PTime.Application.DTOs.Shopping;
using PTime.Application.Interfaces.Services.Shopping;

namespace PTime.API.Controllers.Shopping
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ShoppingItemController : ControllerBase
    {
        private readonly IShoppingItemService _shoppingItemService;

        public ShoppingItemController(IShoppingItemService shoppingItemService)
        {
            _shoppingItemService = shoppingItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _shoppingItemService.GetAllAsync();
            return this.OkResponse(result, "Shopping items recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _shoppingItemService.GetByIdAsync(id);
            if (result == null) this.ErrorResponse("Shopping item not found", 404);
            return this.OkResponse(result, "Shopping item retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ShoppingItemDto shoppingItemDto)
        {
            await _shoppingItemService.AddAsync(shoppingItemDto);
            return this.CreatedResponse(nameof(GetById), new { id = shoppingItemDto.Id }, shoppingItemDto, "Shopping item created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ShoppingItemDto shoppingItemDto)
        {
            if (id != shoppingItemDto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _shoppingItemService.UpdateAsync(shoppingItemDto);
                return this.OkResponse(shoppingItemDto, "Shopping item updated");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _shoppingItemService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Shopping item deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
