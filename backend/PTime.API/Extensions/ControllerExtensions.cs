using Microsoft.AspNetCore.Mvc;
using PTime.Application.Common;

namespace PTime.API.Extensions
{
    public static class ControllerExtensions
    {
        public static IActionResult OkResponse<T>(this ControllerBase ctrl, T data,
                                             string? message = null)
       => ctrl.Ok(ApiResponse<T>.Ok(data, message ?? "Success"));

        public static IActionResult ErrorResponse(this ControllerBase ctrl,
                                                  string message,
                                                  int statusCode = 400,
                                                  string? details = null)
            => ctrl.StatusCode(statusCode,
                               ApiResponse<object>.Fail(message, details));
        public static IActionResult CreatedResponse<T>(this ControllerBase ctrl,
                                               string actionName,
                                               object routeValues,
                                               T data,
                                               string? message = null)
        => ctrl.CreatedAtAction(actionName,
                            routeValues,
                            ApiResponse<T>.Ok(data, message ?? "Created"));

    }
}
