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
    public class PaymentReminderController : ControllerBase
    {
        private readonly IPaymentReminderService _paymentReminderService;

        public PaymentReminderController(IPaymentReminderService paymentReminderService)
        {
            _paymentReminderService = paymentReminderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _paymentReminderService.GetAllAsync();
            return this.OkResponse(result, "Payments reminder recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _paymentReminderService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("Payment reminder not found", 404);
            return this.OkResponse(result, "Payments reminder retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PaymentReminderDto paymentReminderDto)
        {
            await _paymentReminderService.AddAsync(paymentReminderDto);
            return this.CreatedResponse(nameof(GetById), new { id = paymentReminderDto.Id }, paymentReminderDto, "Payment reminder created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] PaymentReminderDto paymentReminderDto)
        {
            if (id != paymentReminderDto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _paymentReminderService.UpdateAsync(paymentReminderDto);
                return this.OkResponse(paymentReminderDto, "Payment reminder updated");
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
                await _paymentReminderService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "Payment reminder deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
