using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.DTOs.Progress
{
    public class WeightRecordDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public float Weight { get; set; }

    }
}
