import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MatCardModule }  from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { NotificationDto } from '../../services/notification-api.service';

@Component({
  selector: 'pt-notif-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,      
    MatButtonModule,
    MatIconModule
  ],  templateUrl: './notif-table.component.html',
  styleUrl: './notif-table.component.scss'
})
export class NotifTableComponent implements OnChanges {
  @Input() notifications: NotificationDto[] = [];
  @Output() edit   = new EventEmitter<NotificationDto>();
  @Output() remove = new EventEmitter<string>();

    displayedColumns = ['message','type','sent','status','actions'];
  dataSource       = new MatTableDataSource<NotificationDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.notifications;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
