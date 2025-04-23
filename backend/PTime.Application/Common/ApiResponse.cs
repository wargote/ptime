using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Common
{
    /// <summary>
    /// Respuesta genérica para cualquier endpoint.
    /// </summary>
    public class ApiResponse<T>
    {
        public bool Success { get; init; }  
        public string Message { get; init; }   
        public T? Data { get; init; }    
        public string? Error { get; init; }  
        public DateTime TimeUtc { get; init; } = DateTime.UtcNow;

       
        public static ApiResponse<T> Ok(T data, string message = "Success") =>
            new() { Success = true, Data = data, Message = message };

        public static ApiResponse<T> Fail(string message, string? error = null) =>
            new() { Success = false, Data = default, Message = message, Error = error };
    }
}
