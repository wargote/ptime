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
    public class WeightRecordController : ControllerBase
    {
        private readonly IWeightRecordService _weightRecordService;

        public WeightRecordController(IWeightRecordService weightRecordService)
        {
            _weightRecordService = weightRecordService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _weightRecordService.GetAllAsync();
            return this.OkResponse(result, "Weights record recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _weightRecordService.GetByIdAsync(id);
            if (result == null) this.ErrorResponse("Weight record not found", 404);
            return this.OkResponse(result, "Weight record retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] WeightRecordDto dto)
        {
            await _weightRecordService.AddAsync(dto);
            return this.CreatedResponse(nameof(GetById), new { id = dto.Id }, dto, "Weight record created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] WeightRecordDto dto)
        {
            if (id != dto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _weightRecordService.UpdateAsync(dto);
                return this.OkResponse(dto, "Weight record updated");
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
                await _weightRecordService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Weight record deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
