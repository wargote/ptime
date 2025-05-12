import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';


import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseDto } from '../../services/expense-api.service';

@Component({
  selector: 'pt-expense-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent implements OnChanges {
  @Input() expenses: ExpenseDto[] = [];
  @Output() edit   = new EventEmitter<ExpenseDto>();
  @Output() remove = new EventEmitter<string>();

  displayedColumns = ['date', 'category', 'amount', 'tags', 'notes', 'actions'];
    dataSource = new MatTableDataSource<ExpenseDto>();
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort)      sort!: MatSort;
  
    ngOnChanges() {
      this.dataSource.data = this.expenses;
      if (this.paginator)  this.dataSource.paginator = this.paginator;
      if (this.sort)       this.dataSource.sort = this.sort;
    }
  
    // filtro rápido por texto
    applyFilter(value: string) {
      this.dataSource.filter = value.trim().toLowerCase();
    }
}
