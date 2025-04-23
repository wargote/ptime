using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PTime.Domain.Entities;
using PTime.Domain.Entities.Common;
using PTime.Domain.Entities.Finance;
using PTime.Domain.Entities.Goals;
using PTime.Domain.Entities.Progress;
using PTime.Domain.Entities.Shopping;
using PTime.Domain.Entities.Travel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Data
{
    public class PTimeDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public PTimeDbContext(DbContextOptions<PTimeDbContext> options) 
           : base(options) { }

        public DbSet<ApplicationUser> Users { get; set; }

        // Finanzas
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<Debt> Debts { get; set; }
        public DbSet<SavingGoal> SavingGoals { get; set; }
        public DbSet<PaymentReminder> PaymentReminders { get; set; }

        // Compras
        public DbSet<ShoppingItem> ShoppingItems { get; set; }

        // Progreso Personal
        public DbSet<WeightRecord> WeightRecords { get; set; }
        public DbSet<BookRead> BooksRead { get; set; }
        public DbSet<GymAttendance> GymAttendances { get; set; }

        // Actividades y Metas
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }

        // Lugares por Visitar
        public DbSet<TravelPlace> TravelPlaces { get; set; }

        // Transversales
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.UserName).IsRequired().HasMaxLength(100);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(150);
                entity.Property(u => u.PasswordHash).IsRequired();
            });
        }
    }
}
