using PTime.Domain.Entities.Finance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static PTime.Application.Interfaces.Repositories.IGenericRepository;

namespace PTime.Application.Interfaces.Repositories.Finance
{
    public interface IDebtRepository : IGenericRepository<Debt>
    {
    }
}
