﻿namespace PTime.API.Middlewares
{
    public static class ExceptionHandlingExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionHandling(this IApplicationBuilder app)
    => app.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}
