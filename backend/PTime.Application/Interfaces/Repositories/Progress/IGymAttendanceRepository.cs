using PTime.Domain.Entities.Progress;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static PTime.Application.Interfaces.Repositories.IGenericRepository;

namespace PTime.Application.Interfaces.Repositories.Progress
{
    public interface IGymAttendanceRepository : IGenericRepository<GymAttendance>
    {
    }
}
