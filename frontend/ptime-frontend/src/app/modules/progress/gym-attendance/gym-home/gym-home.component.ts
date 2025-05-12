import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';  // 👈 solicitado

import { GymAttendanceApiService, GymAttendanceDto } from '../services/gym-attendance-api.service';
import { GymTableComponent } from '../components/gym-table/gym-table.component';
import { GymDialogComponent, GymDialogData } from '../components/gym-dialog/gym-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-gym-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, GymTableComponent, MatCardModule],
  templateUrl: './gym-home.component.html',
  styleUrl: './gym-home.component.scss'
})
export class GymHomeComponent implements OnInit {
  private api    = inject(GymAttendanceApiService);
  private dialog = inject(MatDialog);

  sessions: GymAttendanceDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getSessions().subscribe({
      next: d => (this.sessions = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: GymDialogData = { mode: 'create' };
    this.dialog.open(GymDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(s: GymAttendanceDto) {
    const data: GymDialogData = { mode: 'edit', session: s };
    this.dialog.open(GymDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar sesión',
      message: '¿Seguro que deseas eliminar esta sesión?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
