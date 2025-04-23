using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.DTOs.Finance
{
    public class PaymentReminderDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public string Notes { get; set; }
        public bool AlertSent { get; set; }
    }
}
