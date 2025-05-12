import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatCardModule }     from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatTooltipModule }  from '@angular/material/tooltip';
import { MatChipsModule }    from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoanDto } from '../../services/loan-api.service';

@Component({
  selector: 'pt-loan-table',
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
    MatChipsModule,
    MatInputModule
  ],  templateUrl: './loan-table.component.html',
  styleUrl: './loan-table.component.scss'
})
export class LoanTableComponent implements OnChanges {
  @Input() loans: LoanDto[] = [];
  @Output() edit   = new EventEmitter<LoanDto>();
  @Output() remove = new EventEmitter<string>();

  
  displayedColumns = ['amount','type','description','due','status','actions'];
  dataSource       = new MatTableDataSource<LoanDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.loans;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(v: string) {
    this.dataSource.filter = v.trim().toLowerCase();
  }
}
