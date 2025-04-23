using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Domain.Entities.Common
{
    public class Notification
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Message { get; set; }
        public string Type { get; set; } // WhatsApp, App
        public DateTime SentDate { get; set; }
        public string Status { get; set; }
    }
}
