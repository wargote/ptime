import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SavingGoalApiService, SavingGoalDto } from '../services/saving-goal-api.service';
import { GoalTableComponent } from '../components/goal-table/goal-table.component';
import { GoalDialogComponent, GoalDialogData } from '../components/goal-dialog/goal-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-goals-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, GoalTableComponent],
  templateUrl: './goals-home.component.html',
  styleUrl: './goals-home.component.scss'
})
export class GoalsHomeComponent implements OnInit{
  private api    = inject(SavingGoalApiService);
  private dialog = inject(MatDialog);

  goals: SavingGoalDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getGoals().subscribe({
      next: d => (this.goals = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: GoalDialogData = { mode: 'create' };
    this.dialog.open(GoalDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(g: SavingGoalDto) {
    const data: GoalDialogData = { mode: 'edit', goal: g };
    this.dialog.open(GoalDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar meta',
      message: '¿Seguro que deseas eliminar esta meta de ahorro?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
