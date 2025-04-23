using PTime.Application.DTOs.Travel;
using PTime.Application.Interfaces.Repositories.Travel;
using PTime.Application.Interfaces.Services.Travel;
using PTime.Domain.Entities.Travel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Services.Travel
{
    public class TravelPlaceService : ITravelPlaceService
    {
        private readonly ITravelPlaceRepository _travelPlaceRepository;

        public TravelPlaceService(ITravelPlaceRepository travelPlaceRepository)
        {
            _travelPlaceRepository = travelPlaceRepository;
        }

        public async Task<IEnumerable<TravelPlaceDto>> GetAllAsync()
        {
            var places = await _travelPlaceRepository.GetAllAsync();
            return places.Select(p => new TravelPlaceDto
            {
                Id = p.Id,
                Type = p.Type,
                Name = p.Name,
                Location = p.Location,
                State = p.State,
                Notes = p.Notes,
                PhotoUrl = p.PhotoUrl
            });
        }

        public async Task<TravelPlaceDto?> GetByIdAsync(Guid id)
        {
            var place = await _travelPlaceRepository.GetByIdAsync(id);
            if (place == null) return null;

            return new TravelPlaceDto
            {
                Id = place.Id,
                Type = place.Type,
                Name = place.Name,
                Location = place.Location,
                State = place.State,
                Notes = place.Notes,
                PhotoUrl = place.PhotoUrl
            };
        }

        public async Task AddAsync(TravelPlaceDto dto)
        {
            var entity = new TravelPlace
            {
                Id = Guid.NewGuid(),
                Type = dto.Type,
                Name = dto.Name,
                Location = dto.Location,
                State = dto.State,
                Notes = dto.Notes,
                PhotoUrl = dto.PhotoUrl
            };

            await _travelPlaceRepository.AddAsync(entity);
            await _travelPlaceRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(TravelPlaceDto dto)
        {
            var entity = await _travelPlaceRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Travel place not found");

            entity.Type = dto.Type;
            entity.Name = dto.Name;
            entity.Location = dto.Location;
            entity.State = dto.State;
            entity.Notes = dto.Notes;
            entity.PhotoUrl = dto.PhotoUrl;

            _travelPlaceRepository.Update(entity);
            await _travelPlaceRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _travelPlaceRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Travel place not found");

            _travelPlaceRepository.Delete(entity);
            await _travelPlaceRepository.SaveChangesAsync();
        }
    }
}
