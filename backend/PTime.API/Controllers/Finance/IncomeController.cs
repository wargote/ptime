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
    public class IncomeController : ControllerBase
    {
        private readonly IIncomeService _incomeService;

        public IncomeController(IIncomeService incomeService)
        {
            _incomeService = incomeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _incomeService.GetAllAsync();
            return this.OkResponse(result, "Incomes recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _incomeService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("Income not found", 404);
            return this.OkResponse(result, "Incomes retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] IncomeDto incomeDto)
        {
            await _incomeService.AddAsync(incomeDto);
            return this.CreatedResponse(nameof(GetById), new { id = incomeDto.Id }, incomeDto, "Income created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] IncomeDto incomeDto)
        {
            if (id != incomeDto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _incomeService.UpdateAsync(incomeDto);
                return this.OkResponse(incomeDto, "Income updated");
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
                await _incomeService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Income deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
