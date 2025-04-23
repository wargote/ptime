using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTime.API.Extensions;
using PTime.Application.DTOs.Goals;
using PTime.Application.Interfaces.Services.Goals;

namespace PTime.API.Controllers.Goals
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CalendarEventController : ControllerBase
    {
        private readonly ICalendarEventService _calendarEventService;

        public CalendarEventController(ICalendarEventService calendarEventService)
        {
            _calendarEventService = calendarEventService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _calendarEventService.GetAllAsync();
            return this.OkResponse(result, "Calendar events recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _calendarEventService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("Calendar event not found", 404);
            return this.OkResponse(result, "Calendar event retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CalendarEventDto dto)
        {
            await _calendarEventService.AddAsync(dto);
            return this.CreatedResponse(nameof(GetById), new { id = dto.Id }, dto, "Calendar event created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CalendarEventDto dto)
        {
            if (id != dto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _calendarEventService.UpdateAsync(dto);
                return this.OkResponse(dto, "Calendar event updated");
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
                await _calendarEventService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Calendar event deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
