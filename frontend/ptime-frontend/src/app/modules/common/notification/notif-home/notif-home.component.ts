import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NotificationApiService, NotificationDto } from '../services/notification-api.service';
import { NotifTableComponent } from '../components/notif-table/notif-table.component';
import { NotifDialogComponent, NotifDialogData } from '../components/notif-dialog/notif-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-notif-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, NotifTableComponent],
  templateUrl: './notif-home.component.html',
  styleUrl: './notif-home.component.scss'
})
export class NotifHomeComponent implements OnInit {
  private api    = inject(NotificationApiService);
  private dialog = inject(MatDialog);

  notifications: NotificationDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getAll().subscribe({
      next: d => (this.notifications = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: NotifDialogData = { mode: 'create' };
    this.dialog.open(NotifDialogComponent, { width: '500px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(n: NotificationDto) {
    const data: NotifDialogData = { mode: 'edit', notif: n };
    this.dialog.open(NotifDialogComponent, { width: '500px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar notificación',
      message: '¿Seguro que deseas eliminar esta notificación?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
