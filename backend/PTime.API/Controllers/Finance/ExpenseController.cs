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
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _expenseService.GetAllAsync();
            return this.OkResponse(result, "Expenses recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _expenseService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("Expense not found", 404);
            return this.OkResponse(result, "Expense retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExpenseDto expenseDto)
        {
            await _expenseService.AddAsync(expenseDto);
            return this.CreatedResponse(nameof(GetById), new { id = expenseDto.Id }, expenseDto, "Expense created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ExpenseDto expenseDto)
        {
            if (id != expenseDto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _expenseService.UpdateAsync(expenseDto);
                return this.OkResponse(expenseDto, "Expense updated");
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
                await _expenseService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Notification deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
