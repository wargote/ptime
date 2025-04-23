using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTime.API.Extensions;
using PTime.Application.DTOs.Common;
using PTime.Application.Interfaces.Services.Common;

namespace PTime.API.Controllers.Common
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;

        public UserProfileController(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _userProfileService.GetAllAsync();
            return this.OkResponse(result, "User profiles recovered");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _userProfileService.GetByIdAsync(id);
            if (result == null) return this.ErrorResponse("User profile not found", 404);
            return this.OkResponse(result, "User profile retrieved");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserProfileDto dto)
        {
            await _userProfileService.AddAsync(dto);
            return this.CreatedResponse(nameof(GetById), new { id = dto.Id }, dto, "User profile created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserProfileDto dto)
        {
            if (id != dto.Id) return this.ErrorResponse("ID mismatch", 400);

            try
            {
                await _userProfileService.UpdateAsync(dto);
                return this.OkResponse(dto, "User profile updated");
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
                await _userProfileService.DeleteAsync(id);
                return this.OkResponse<object?>(null, "User profile deleted");
            }
            catch (Exception ex)
            {
                return this.ErrorResponse(ex.Message, 404);
            }
        }
    }
}
