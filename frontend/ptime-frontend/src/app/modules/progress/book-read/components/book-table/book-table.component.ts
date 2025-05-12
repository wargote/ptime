import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }         from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatButtonModule }         from '@angular/material/button';
import { MatIconModule }           from '@angular/material/icon';
import { MatTooltipModule }        from '@angular/material/tooltip';
import { MatInputModule }          from '@angular/material/input'; 
import { MatFormFieldModule }      from '@angular/material/form-field';
import { BookReadDto } from '../../services/book-read-api.service';

@Component({
  selector: 'pt-book-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,     
    MatFormFieldModule
  ],  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss'
})
export class BookTableComponent implements OnChanges {
  @Input() books: BookReadDto[] = [];
  @Output() edit   = new EventEmitter<BookReadDto>();
  @Output() remove = new EventEmitter<string>();

    displayedColumns = ['title','author','date','notes','actions'];
  dataSource       = new MatTableDataSource<BookReadDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.books;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
