using PTime.Domain.Entities.Travel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static PTime.Application.Interfaces.Repositories.IGenericRepository;

namespace PTime.Application.Interfaces.Repositories.Travel
{
    public interface ITravelPlaceRepository : IGenericRepository<TravelPlace>
    {
    }
}
