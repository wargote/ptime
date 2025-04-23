using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Domain.Entities.Finance
{
    public class PaymentReminder
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public string Notes { get; set; }
        public bool AlertSent { get; set; }
    }
}
