import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }           from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatButtonModule }         from '@angular/material/button';
import { MatIconModule }           from '@angular/material/icon';
import { MatInputModule }          from '@angular/material/input';
import { WeightRecordDto } from '../../services/weight-record-api.service';

@Component({
  selector: 'pt-weight-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule         
  ],  templateUrl: './weight-table.component.html',
  styleUrl: './weight-table.component.scss'
})
export class WeightTableComponent implements OnChanges {
  @Input() records: WeightRecordDto[] = [];
  @Output() edit   = new EventEmitter<WeightRecordDto>();
  @Output() remove = new EventEmitter<string>();

  
  displayedColumns = ['date','weight','actions'];
  dataSource       = new MatTableDataSource<WeightRecordDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.records;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
