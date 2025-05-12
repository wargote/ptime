import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatCardModule }         from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatTooltipModule }      from '@angular/material/tooltip';
import { MatInputModule }        from '@angular/material/input';  
import { MatChipsModule }        from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskItemDto } from '../../services/task-item-api.service';

@Component({
  selector: 'pt-item-table',
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
    MatChipsModule
  ],  templateUrl: './item-table.component.html',
  styleUrl: './item-table.component.scss'
})
export class ItemTableComponent implements OnChanges {
  @Input() tasks: TaskItemDto[] = [];
  @Output() edit   = new EventEmitter<TaskItemDto>();
  @Output() remove = new EventEmitter<string>();

   displayedColumns = ['title','description','status','due','priority','actions'];
  dataSource       = new MatTableDataSource<TaskItemDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.tasks;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
