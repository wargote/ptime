using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTime.API.Extensions;
using PTime.Application.DTOs.Finance;
using PTime.Application.Interfaces.Services.Finance;

namespace PTime.API.Controllers.Finance
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SavingGoalController : ControllerBase
    {
        private readonly ISavingGoalService _savingGoalService;

        public SavingGoalController(ISavingGoalService savingGoalService)
        {
            _savingGoalService = savingGoalService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _savingGoalService.GetAllAsync();
            return this.OkResponse(result, "Saving goals recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _savingGoalService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("Saving goal not found", 404);
            return this.OkResponse(result, "Saving goals retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SavingGoalDto savingGoalDto)
        {
            await _savingGoalService.AddAsync(savingGoalDto);
            return this.CreatedResponse(nameof(GetById), new { id = savingGoalDto.Id }, savingGoalDto, "Saving goal created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SavingGoalDto savingGoalDto)
        {
            if (id != savingGoalDto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _savingGoalService.UpdateAsync(savingGoalDto);
                return this.OkResponse(savingGoalDto, "Saving goal updated");
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
                await _savingGoalService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Saving goal deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
