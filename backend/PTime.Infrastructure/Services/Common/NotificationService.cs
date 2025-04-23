using PTime.Application.DTOs.Common;
using PTime.Application.Interfaces.Repositories.Common;
using PTime.Application.Interfaces.Services.Common;
using PTime.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Services.Common
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<IEnumerable<NotificationDto>> GetAllAsync()
        {
            var notifications = await _notificationRepository.GetAllAsync();
            return notifications.Select(n => new NotificationDto
            {
                Id = n.Id,
                Message = n.Message,
                Type = n.Type,
                SentDate = n.SentDate,
                Status = n.Status
            });
        }

        public async Task<NotificationDto?> GetByIdAsync(Guid id)
        {
            var notification = await _notificationRepository.GetByIdAsync(id);
            if (notification == null) return null;

            return new NotificationDto
            {
                Id = notification.Id,
                Message = notification.Message,
                Type = notification.Type,
                SentDate = notification.SentDate,
                Status = notification.Status
            };
        }

        public async Task AddAsync(NotificationDto dto)
        {
            var entity = new Notification
            {
                Id = Guid.NewGuid(),
                Message = dto.Message,
                Type = dto.Type,
                SentDate = dto.SentDate,
                Status = dto.Status
            };

            await _notificationRepository.AddAsync(entity);
            await _notificationRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(NotificationDto dto)
        {
            var entity = await _notificationRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Notification not found");

            entity.Message = dto.Message;
            entity.Type = dto.Type;
            entity.SentDate = dto.SentDate;
            entity.Status = dto.Status;

            _notificationRepository.Update(entity);
            await _notificationRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _notificationRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Notification not found");

            _notificationRepository.Delete(entity);
            await _notificationRepository.SaveChangesAsync();
        }
    }
}
