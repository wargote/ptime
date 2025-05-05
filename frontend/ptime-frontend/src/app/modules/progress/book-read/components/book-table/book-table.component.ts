import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookReadDto } from '../../services/book-read-api.service';

@Component({
  selector: 'pt-book-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss'
})
export class BookTableComponent {
  @Input() books: BookReadDto[] = [];
  @Output() edit   = new EventEmitter<BookReadDto>();
  @Output() remove = new EventEmitter<string>();
}
