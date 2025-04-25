using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PTime.API.Middlewares;
using PTime.Application.Interfaces.Repositories.Common;
using PTime.Application.Interfaces.Repositories.Finance;
using PTime.Application.Interfaces.Repositories.Goals;
using PTime.Application.Interfaces.Repositories.Progress;
using PTime.Application.Interfaces.Repositories.Shopping;
using PTime.Application.Interfaces.Repositories.Travel;
using PTime.Application.Interfaces.Services;
using PTime.Application.Interfaces.Services.Common;
using PTime.Application.Interfaces.Services.Finance;
using PTime.Application.Interfaces.Services.Goals;
using PTime.Application.Interfaces.Services.Progress;
using PTime.Application.Interfaces.Services.Shopping;
using PTime.Application.Interfaces.Services.Travel;
using PTime.Application.Interfaces.Utilities;
using PTime.Domain.Entities;
using PTime.Infrastructure.Data;
using PTime.Infrastructure.Repositories.Common;
using PTime.Infrastructure.Repositories.Finance;
using PTime.Infrastructure.Repositories.Goals;
using PTime.Infrastructure.Repositories.Progress;
using PTime.Infrastructure.Repositories.Shopping;
using PTime.Infrastructure.Repositories.Travel;
using PTime.Infrastructure.Services;
using PTime.Infrastructure.Services.Common;
using PTime.Infrastructure.Services.Finance;
using PTime.Infrastructure.Services.Goals;
using PTime.Infrastructure.Services.Progress;
using PTime.Infrastructure.Services.Shopping;
using PTime.Infrastructure.Services.Travel;
using PTime.Infrastructure.Utilities;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")   
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();                    
    });
});

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
// repositories
builder.Services.AddScoped<IIncomeRepository, IncomeRepository>();
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<ILoanRepository, LoanRepository>();
builder.Services.AddScoped<IDebtRepository, DebtRepository>();
builder.Services.AddScoped<ISavingGoalRepository, SavingGoalRepository>();
builder.Services.AddScoped<IPaymentReminderRepository, PaymentReminderRepository>();
builder.Services.AddScoped<IShoppingItemRepository, ShoppingItemRepository>();
builder.Services.AddScoped<IWeightRecordRepository, WeightRecordRepository>();
builder.Services.AddScoped<IBookReadRepository, BookReadRepository>();
builder.Services.AddScoped<IGymAttendanceRepository, GymAttendanceRepository>();
builder.Services.AddScoped<ITaskItemRepository, TaskItemRepository>();
builder.Services.AddScoped<ICalendarEventRepository, CalendarEventRepository>();
builder.Services.AddScoped<ITravelPlaceRepository, TravelPlaceRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IIncomeService, IncomeService>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<ILoanService, LoanService>();
builder.Services.AddScoped<IDebtService, DebtService>();
builder.Services.AddScoped<ISavingGoalService, SavingGoalService>();
builder.Services.AddScoped<IPaymentReminderService, PaymentReminderService>();
builder.Services.AddScoped<IShoppingItemService, ShoppingItemService>();
builder.Services.AddScoped<IWeightRecordService, WeightRecordService>();
builder.Services.AddScoped<IBookReadService, BookReadService>();
builder.Services.AddScoped<IGymAttendanceService, GymAttendanceService>();
builder.Services.AddScoped<ITaskItemService, TaskItemService>();
builder.Services.AddScoped<ICalendarEventService, CalendarEventService>();
builder.Services.AddScoped<ITravelPlaceService, TravelPlaceService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext
builder.Services.AddDbContext<PTimeDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<PTimeDbContext>()
    .AddDefaultTokenProviders();

// Configurar JWT
var jwtKey = builder.Configuration["Jwt:Key"]!;
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "JwtBearer";
    options.DefaultChallengeScheme = "JwtBearer";
}).AddJwtBearer("JwtBearer", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],

        ValidateLifetime = true,
        IssuerSigningKey = key,
        ValidateIssuerSigningKey = true
    };
});



// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

var app = builder.Build();
app.UseGlobalExceptionHandling();
app.UseCors("DevPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
