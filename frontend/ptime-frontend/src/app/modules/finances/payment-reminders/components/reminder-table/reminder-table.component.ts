import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatCardModule }        from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatChipsModule }       from '@angular/material/chips';
import { MatTooltipModule }     from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaymentReminderDto } from '../../services/payment-reminder-api.service';

@Component({
  selector: 'pt-reminder-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatInputModule
  ],
   templateUrl: './reminder-table.component.html',
  styleUrl: './reminder-table.component.scss'
})
export class ReminderTableComponent implements OnChanges {
  @Input() reminders: PaymentReminderDto[] = [];
  @Output() edit   = new EventEmitter<PaymentReminderDto>();
  @Output() remove = new EventEmitter<string>();
  
  displayedColumns = ['title','dueDate','notes','alert','actions'];
  dataSource       = new MatTableDataSource<PaymentReminderDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.reminders;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
