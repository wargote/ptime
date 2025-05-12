import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';  

import { TaskItemApiService, TaskItemDto } from '../services/task-item-api.service';
import { ItemTableComponent } from '../components/item-table/item-table.component';
import { ItemDialogComponent, ItemDialogData } from '../components/item-dialog/item-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-tasks-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ItemTableComponent, MatCardModule],
  templateUrl: './tasks-home.component.html',
  styleUrl: './tasks-home.component.scss'
})
export class TasksHomeComponent {
  private api    = inject(TaskItemApiService);
  private dialog = inject(MatDialog);

  tasks: TaskItemDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getTasks().subscribe({
      next: d => (this.tasks = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: ItemDialogData = { mode: 'create' };
    this.dialog.open(ItemDialogComponent, { width: '450px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(t: TaskItemDto) {
    const data: ItemDialogData = { mode: 'edit', task: t };
    this.dialog.open(ItemDialogComponent, { width: '450px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar tarea',
      message: '¿Seguro que deseas eliminar esta tarea?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
