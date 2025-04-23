using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.DTOs.Travel
{
    public class TravelPlaceDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string State { get; set; }
        public string Notes { get; set; }
        public string PhotoUrl { get; set; }
    }
}
