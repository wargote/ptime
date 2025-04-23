using PTime.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static PTime.Application.Interfaces.Repositories.IGenericRepository;

namespace PTime.Application.Interfaces.Repositories.Common
{
    public interface IUserProfileRepository : IGenericRepository<UserProfile>
    {
    }
}
