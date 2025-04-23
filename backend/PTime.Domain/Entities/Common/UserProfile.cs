using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Domain.Entities.Common
{
    public class UserProfile
    {
        public Guid Id { get; set; }
        public Guid IdentityUserId { get; set; }
        public string DisplayName { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Theme { get; set; }
        public string Language { get; set; }
        public string SettingsJson { get; set; }
    }
}
