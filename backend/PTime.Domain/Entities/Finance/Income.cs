using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Domain.Entities.Finance
{
    public class Income
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public string Tags { get; set; }
        public DateTime Date { get; set; }
        public string Notes { get; set; }
    }
}
