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
    public class LoanController : ControllerBase
    {
        private readonly ILoanService _loanService;

        public LoanController(ILoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _loanService.GetAllAsync();
            return this.OkResponse(result, "Loans recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _loanService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("Loan not found", 404);
            return this.OkResponse(result, "Loans retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LoanDto loanDto)
        {
            await _loanService.AddAsync(loanDto);
            return this.CreatedResponse(nameof(GetById), new { id = loanDto.Id }, loanDto, "Loan created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] LoanDto loanDto)
        {
            if (id != loanDto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _loanService.UpdateAsync(loanDto);
                return this.OkResponse(loanDto, "Loan updated");
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
                await _loanService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Loan deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
