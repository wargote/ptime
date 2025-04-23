using PTime.Application.DTOs.Goals;
using PTime.Application.Interfaces.Repositories.Goals;
using PTime.Application.Interfaces.Services.Goals;
using PTime.Domain.Entities.Goals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Services.Goals
{
    public class TaskItemService : ITaskItemService
    {
        private readonly ITaskItemRepository _taskItemRepository;

        public TaskItemService(ITaskItemRepository taskItemRepository)
        {
            _taskItemRepository = taskItemRepository;
        }

        public async Task<IEnumerable<TaskItemDto>> GetAllAsync()
        {
            var items = await _taskItemRepository.GetAllAsync();
            return items.Select(i => new TaskItemDto
            {
                Id = i.Id,
                Title = i.Title,
                Description = i.Description,
                Status = i.Status,
                DueDate = i.DueDate,
                Priority = i.Priority
            });
        }

        public async Task<TaskItemDto?> GetByIdAsync(Guid id)
        {
            var item = await _taskItemRepository.GetByIdAsync(id);
            if (item == null) return null;

            return new TaskItemDto
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                Status = item.Status,
                DueDate = item.DueDate,
                Priority = item.Priority
            };
        }

        public async Task AddAsync(TaskItemDto dto)
        {
            var entity = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Description = dto.Description,
                Status = dto.Status,
                DueDate = dto.DueDate,
                Priority = dto.Priority
            };

            await _taskItemRepository.AddAsync(entity);
            await _taskItemRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(TaskItemDto dto)
        {
            var entity = await _taskItemRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Task not found");

            entity.Title = dto.Title;
            entity.Description = dto.Description;
            entity.Status = dto.Status;
            entity.DueDate = dto.DueDate;
            entity.Priority = dto.Priority;

            _taskItemRepository.Update(entity);
            await _taskItemRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _taskItemRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Task not found");

            _taskItemRepository.Delete(entity);
            await _taskItemRepository.SaveChangesAsync();
        }
    }
}
