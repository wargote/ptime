using PTime.Application.DTOs.Progress;
using PTime.Application.Interfaces.Repositories.Progress;
using PTime.Application.Interfaces.Services.Progress;
using PTime.Domain.Entities.Progress;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PTime.Infrastructure.Services.Progress
{
    public class BookReadService : IBookReadService
    {
        private readonly IBookReadRepository _bookReadRepository;

        public BookReadService(IBookReadRepository bookReadRepository)
        {
            _bookReadRepository = bookReadRepository;
        }

        public async Task<IEnumerable<BookReadDto>> GetAllAsync()
        {
            var books = await _bookReadRepository.GetAllAsync();
            return books.Select(b => new BookReadDto
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                FinishedDate = b.FinishedDate,
                Notes = b.Notes
            });
        }

        public async Task<BookReadDto?> GetByIdAsync(Guid id)
        {
            var book = await _bookReadRepository.GetByIdAsync(id);
            if (book == null) return null;

            return new BookReadDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                FinishedDate = book.FinishedDate,
                Notes = book.Notes
            };
        }

        public async Task AddAsync(BookReadDto dto)
        {
            var entity = new BookRead
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Author = dto.Author,
                FinishedDate = dto.FinishedDate,
                Notes = dto.Notes
            };

            await _bookReadRepository.AddAsync(entity);
            await _bookReadRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(BookReadDto dto)
        {
            var entity = await _bookReadRepository.GetByIdAsync(dto.Id);
            if (entity == null) throw new Exception("Book record not found");

            entity.Title = dto.Title;
            entity.Author = dto.Author;
            entity.FinishedDate = dto.FinishedDate;
            entity.Notes = dto.Notes;

            _bookReadRepository.Update(entity);
            await _bookReadRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _bookReadRepository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Book record not found");

            _bookReadRepository.Delete(entity);
            await _bookReadRepository.SaveChangesAsync();
        }
    }
}
