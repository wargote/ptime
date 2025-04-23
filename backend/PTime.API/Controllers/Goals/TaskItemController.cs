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
    public class TaskItemController : ControllerBase
    {
        private readonly ITaskItemService _taskItemService;

        public TaskItemController(ITaskItemService taskItemService)
        {
            _taskItemService = taskItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _taskItemService.GetAllAsync();
            return this.OkResponse(result, "Task Items recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _taskItemService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("Task Item not found", 404);
            return this.OkResponse(result, "Task Item retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskItemDto dto)
        {
            await _taskItemService.AddAsync(dto);
            return this.CreatedResponse(nameof(GetById), new { id = dto.Id }, dto, "Task Item created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] TaskItemDto dto)
        {
            if (id != dto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _taskItemService.UpdateAsync(dto);
                return this.OkResponse(dto, "Task Item updated");
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
                await _taskItemService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Task Item deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
