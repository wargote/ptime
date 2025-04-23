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
    public class GymAttendanceController : ControllerBase
    {
        private readonly IGymAttendanceService _gymAttendanceService;

        public GymAttendanceController(IGymAttendanceService gymAttendanceService)
        {
            _gymAttendanceService = gymAttendanceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _gymAttendanceService.GetAllAsync();
            return this.OkResponse(result, "Gym attendances recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _gymAttendanceService.GetByIdAsync(id);
            if (result == null) this.ErrorResponse("Gym attendance not found", 404);
            return this.OkResponse(result, "Gym attendance retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GymAttendanceDto dto)
        {
            await _gymAttendanceService.AddAsync(dto);
            return this.CreatedResponse(nameof(GetById), new { id = dto.Id }, dto, "Gym attendance created");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _gymAttendanceService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Gym attendance deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
