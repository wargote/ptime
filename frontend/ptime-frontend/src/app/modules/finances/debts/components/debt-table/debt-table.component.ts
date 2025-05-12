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

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DebtDto } from '../../services/debt-api.service';

@Component({
  selector: 'pt-debt-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './debt-table.component.html',
  styleUrl: './debt-table.component.scss'
})
export class DebtTableComponent implements OnChanges {
  @Input() debts: DebtDto[] = [];
  @Output() edit   = new EventEmitter<DebtDto>();
  @Output() remove = new EventEmitter<string>();

  displayedColumns = ['description', 'total', 'paid', 'due', 'status', 'actions'];
  dataSource = new MatTableDataSource<DebtDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.debts;
    if (this.paginator)  this.dataSource.paginator = this.paginator;
    if (this.sort)       this.dataSource.sort = this.sort;
  }

  // filtro rápido por texto
  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
