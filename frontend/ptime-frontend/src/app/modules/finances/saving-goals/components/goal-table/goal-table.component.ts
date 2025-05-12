import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SavingGoalDto } from '../../services/saving-goal-api.service';

@Component({
  selector: 'pt-goal-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatInputModule,
    MatCardModule
  ],  templateUrl: './goal-table.component.html',
  styleUrl: './goal-table.component.scss'
})
export class GoalTableComponent implements OnChanges {
  @Input() goals: SavingGoalDto[] = [];
  @Output() edit   = new EventEmitter<SavingGoalDto>();
  @Output() remove = new EventEmitter<string>();

   displayedColumns = ['title','target','saved','deadline','progress','notes','actions'];
  dataSource       = new MatTableDataSource<SavingGoalDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.goals;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(v: string) {
    this.dataSource.filter = v.trim().toLowerCase();
  }

  progress(g: SavingGoalDto) {
    return Math.min(100, Math.round(g.savedAmount / g.targetAmount * 100));
  }
}
