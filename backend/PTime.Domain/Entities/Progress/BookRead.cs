using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Domain.Entities.Progress
{
    public class BookRead
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime FinishedDate { get; set; }
        public string Notes { get; set; }
    }
}
