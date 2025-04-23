using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PTime.Application.DTOs.Auth;
using PTime.Application.Interfaces.Services;
using PTime.Domain.Entities;
using PTime.Infrastructure.Data;
using PTime.Infrastructure.Utilities;

namespace PTime.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var result = await _authService.RegisterAsync(dto);

            if (result.StartsWith("El correo") || result.Contains("Password") || result.Contains("no es válido"))
                return BadRequest(result);

            return Ok(new { Token = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _authService.LoginAsync(dto);
            if (token == null)
                return Unauthorized("Credenciales inválidas.");

            return Ok(new { Token = token });
        }
    }
}
