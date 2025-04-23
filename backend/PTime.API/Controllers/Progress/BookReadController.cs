using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTime.API.Extensions;
using PTime.Application.DTOs.Progress;
using PTime.Application.Interfaces.Services.Progress;

namespace PTime.API.Controllers.Progress
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookReadController : ControllerBase
    {
        private readonly IBookReadService _bookReadService;

        public BookReadController(IBookReadService bookReadService)
        {
            _bookReadService = bookReadService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _bookReadService.GetAllAsync();
            return this.OkResponse(result, "Notifications recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _bookReadService.GetByIdAsync(id);
            if (result == null) this.ErrorResponse("Book read not found", 404);
            return this.OkResponse(result, "Book read retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BookReadDto dto)
        {
            await _bookReadService.AddAsync(dto);
            return this.CreatedResponse(nameof(GetById), new { id = dto.Id }, dto, "Book read created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] BookReadDto dto)
        {
            if (id != dto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _bookReadService.UpdateAsync(dto);
                return this.OkResponse(dto, "Book read updated");
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
                await _bookReadService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Book read deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
