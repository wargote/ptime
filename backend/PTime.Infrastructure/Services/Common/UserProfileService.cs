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
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserProfileRepository _userProfileRepository;

        public UserProfileService(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        public async Task<IEnumerable<UserProfileDto>> GetAllAsync()
        {
            var users = await _userProfileRepository.GetAllAsync();
            return users.Select(u => new UserProfileDto
            {
                Id = u.Id,
                DisplayName = u.DisplayName,
                ProfileImageUrl = u.ProfileImageUrl,
                Theme = u.Theme,
                Language = u.Language,
                SettingsJson = u.SettingsJson
            });
        }

        public async Task<UserProfileDto?> GetByIdAsync(Guid id)
        {
            var user = await _userProfileRepository.GetByIdAsync(id);
            if (user == null) return null;

            return new UserProfileDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                ProfileImageUrl = user.ProfileImageUrl,
                Theme = user.Theme,
                Language = user.Language,
                SettingsJson = user.SettingsJson
            };
        }

        public async Task AddAsync(UserProfileDto dto)
        {
            var entity = new UserProfile
            {
                Id = Guid.NewGuid(),
                DisplayName = dto.DisplayName,
                ProfileImageUrl = dto.ProfileImageUrl,
                Theme = dto.Theme,
                Language = dto.Language,
                SettingsJson = dto.SettingsJson
            };

            await _userProfileRepository.AddAsync(entity);
            await _userProfileRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(UserProfileDto dto)
        {
            var entity = await _userProfileRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("User profile not found");

            entity.DisplayName = dto.DisplayName;
            entity.ProfileImageUrl = dto.ProfileImageUrl;
            entity.Theme = dto.Theme;
            entity.Language = dto.Language;
            entity.SettingsJson = dto.SettingsJson;

            _userProfileRepository.Update(entity);
            await _userProfileRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _userProfileRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("User profile not found");

            _userProfileRepository.Delete(entity);
            await _userProfileRepository.SaveChangesAsync();
        }
    }
}
