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
    public class CalendarEventService : ICalendarEventService
    {
        private readonly ICalendarEventRepository _calendarEventRepository;

        public CalendarEventService(ICalendarEventRepository calendarEventRepository)
        {
            _calendarEventRepository = calendarEventRepository;
        }

        public async Task<IEnumerable<CalendarEventDto>> GetAllAsync()
        {
            var events = await _calendarEventRepository.GetAllAsync();
            return events.Select(e => new CalendarEventDto
            {
                Id = e.Id,
                Title = e.Title,
                StartDateTime = e.StartDateTime,
                EndDateTime = e.EndDateTime,
                Notes = e.Notes,
                SyncedWithGoogle = e.SyncedWithGoogle
            });
        }

        public async Task<CalendarEventDto?> GetByIdAsync(Guid id)
        {
            var ev = await _calendarEventRepository.GetByIdAsync(id);
            if (ev == null) return null;

            return new CalendarEventDto
            {
                Id = ev.Id,
                Title = ev.Title,
                StartDateTime = ev.StartDateTime,
                EndDateTime = ev.EndDateTime,
                Notes = ev.Notes,
                SyncedWithGoogle = ev.SyncedWithGoogle
            };
        }

        public async Task AddAsync(CalendarEventDto dto)
        {
            var entity = new CalendarEvent
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                StartDateTime = dto.StartDateTime,
                EndDateTime = dto.EndDateTime,
                Notes = dto.Notes,
                SyncedWithGoogle = dto.SyncedWithGoogle
            };

            await _calendarEventRepository.AddAsync(entity);
            await _calendarEventRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(CalendarEventDto dto)
        {
            var entity = await _calendarEventRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Calendar event not found");

            entity.Title = dto.Title;
            entity.StartDateTime = dto.StartDateTime;
            entity.EndDateTime = dto.EndDateTime;
            entity.Notes = dto.Notes;
            entity.SyncedWithGoogle = dto.SyncedWithGoogle;

            _calendarEventRepository.Update(entity);
            await _calendarEventRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _calendarEventRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Calendar event not found");

            _calendarEventRepository.Delete(entity);
            await _calendarEventRepository.SaveChangesAsync();
        }
    }
}
