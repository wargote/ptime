using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Domain.Entities.Travel
{
    public class TravelPlace
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Type { get; set; } // Ciudad, Restaurante, Hotel
        public string Name { get; set; }
        public string Location { get; set; }
        public string State { get; set; }
        public string Notes { get; set; }
        public string PhotoUrl { get; set; }
    }
}
