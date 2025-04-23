using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.DTOs.Finance
{
    public class SavingGoalDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal SavedAmount { get; set; }
        public DateTime Deadline { get; set; }
        public string Notes { get; set; }

    }
}
