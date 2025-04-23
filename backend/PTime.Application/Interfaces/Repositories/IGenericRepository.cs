using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Application.Interfaces.Repositories
{
    public interface IGenericRepository
    {
        public interface IGenericRepository<T> where T : class
        {
            Task<T?> GetByIdAsync(Guid id);
            Task<IEnumerable<T>> GetAllAsync();
            Task AddAsync(T entity);
            void Update(T entity);
            void Delete(T entity);
            Task SaveChangesAsync();
        }

    }
}
