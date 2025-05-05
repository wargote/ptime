import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { BookReadApiService, BookReadDto } from '../services/book-read-api.service';
import { BookTableComponent } from '../components/book-table/book-table.component';
import { BookDialogComponent, BookDialogData } from '../components/book-dialog/book-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-book-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, BookTableComponent],
  templateUrl: './book-home.component.html',
  styleUrl: './book-home.component.scss'
})
export class BookHomeComponent implements OnInit {
  private api    = inject(BookReadApiService);
  private dialog = inject(MatDialog);

  books: BookReadDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getBooks().subscribe({
      next: d => (this.books = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: BookDialogData = { mode: 'create' };
    this.dialog.open(BookDialogComponent, { width: '450px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(b: BookReadDto) {
    const data: BookDialogData = { mode: 'edit', book: b };
    this.dialog.open(BookDialogComponent, { width: '450px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar libro',
      message: '¿Seguro que deseas eliminar este registro?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
