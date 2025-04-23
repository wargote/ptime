using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.DTOs.Common
{
    public class NotificationDto
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public DateTime SentDate { get; set; }
        public string Status { get; set; }
    }
}
