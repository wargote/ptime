import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PaymentReminderApiService, PaymentReminderDto } from '../services/payment-reminder-api.service';
import { ReminderTableComponent } from '../components/reminder-table/reminder-table.component';
import { ReminderDialogComponent, ReminderDialogData } from '../components/reminder-dialog/reminder-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-reminders-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ReminderTableComponent],
  templateUrl: './reminders-home.component.html',
  styleUrl: './reminders-home.component.scss'
})
export class RemindersHomeComponent implements OnInit {

  private api    = inject(PaymentReminderApiService);
  private dialog = inject(MatDialog);

  reminders: PaymentReminderDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getReminders().subscribe({
      next: d => (this.reminders = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: ReminderDialogData = { mode: 'create' };
    this.dialog.open(ReminderDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(r: PaymentReminderDto) {
    const data: ReminderDialogData = { mode: 'edit', reminder: r };
    this.dialog.open(ReminderDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar recordatorio',
      message: '¿Seguro que deseas eliminar este recordatorio?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
