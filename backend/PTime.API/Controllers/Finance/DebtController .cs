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
    public class DebtController : ControllerBase
    {
        private readonly IDebtService _debtService;

        public DebtController(IDebtService debtService)
        {
            _debtService = debtService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _debtService.GetAllAsync();
            return this.OkResponse(result, "Debts recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _debtService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("Debt not found", 404);
            return this.OkResponse(result, "Debt retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DebtDto debtDto)
        {
            await _debtService.AddAsync(debtDto);
            return this.CreatedResponse(nameof(GetById), new { id = debtDto.Id }, debtDto, "Debt created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] DebtDto debtDto)
        {
            if (id != debtDto.Id) this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _debtService.UpdateAsync(debtDto);
                return this.OkResponse(debtDto, "Debt updated") ;
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
                await _debtService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Debt deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
