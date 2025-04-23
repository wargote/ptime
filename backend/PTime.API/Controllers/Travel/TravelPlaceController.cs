using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTime.API.Extensions;
using PTime.Application.DTOs.Travel;
using PTime.Application.Interfaces.Services.Travel;

namespace PTime.API.Controllers.Travel
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TravelPlaceController : ControllerBase
    {
        private readonly ITravelPlaceService _travelPlaceService;

        public TravelPlaceController(ITravelPlaceService travelPlaceService)
        {
            _travelPlaceService = travelPlaceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _travelPlaceService.GetAllAsync();
            return this.OkResponse(result, "Travel places recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _travelPlaceService.GetByIdAsync(id);
            if (result == null) this.ErrorResponse("Travel place not found", 404);
            return this.OkResponse(result, "Travel place retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TravelPlaceDto dto)
        {
            await _travelPlaceService.AddAsync(dto);
            return this.CreatedResponse(nameof(GetById), new { id = dto.Id }, dto, "Travel place created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] TravelPlaceDto dto)
        {
            if (id != dto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _travelPlaceService.UpdateAsync(dto);
                return this.OkResponse(dto, "Travel place updated");
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
                await _travelPlaceService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Travel place deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
