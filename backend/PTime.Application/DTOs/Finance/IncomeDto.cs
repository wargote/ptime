using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.DTOs.Finance
{
    public class IncomeDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public string Tags { get; set; }
        public DateTime Date { get; set; }
        public string Notes { get; set; }
    }
}
