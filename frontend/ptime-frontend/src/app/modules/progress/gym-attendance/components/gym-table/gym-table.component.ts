import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }       from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatInputModule }      from '@angular/material/input';
import { GymAttendanceDto } from '../../services/gym-attendance-api.service';

@Component({
  selector: 'pt-gym-table',
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
  ],  templateUrl: './gym-table.component.html',
  styleUrl: './gym-table.component.scss'
})
export class GymTableComponent implements OnChanges {
  @Input() sessions: GymAttendanceDto[] = [];
  @Output() edit   = new EventEmitter<GymAttendanceDto>();
  @Output() remove = new EventEmitter<string>();

  
  displayedColumns = ['date','duration','actions'];
  dataSource       = new MatTableDataSource<GymAttendanceDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.sessions;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
