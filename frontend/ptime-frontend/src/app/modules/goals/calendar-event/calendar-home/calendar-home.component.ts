import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { CalendarEventApiService, CalendarEventDto } from '../services/calendar-event-api.service';
import { EventTableComponent } from '../components/event-table/event-table.component';
import { EventDialogComponent, EventDialogData } from '../components/event-dialog/event-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-calendar-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, EventTableComponent, MatCardModule],
  templateUrl: './calendar-home.component.html',
  styleUrl: './calendar-home.component.scss'
})
export class CalendarHomeComponent implements OnInit {
  private api    = inject(CalendarEventApiService);
  private dialog = inject(MatDialog);

  events: CalendarEventDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getEvents().subscribe({
      next: d => (this.events = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: EventDialogData = { mode: 'create' };
    this.dialog.open(EventDialogComponent, { width: '450px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(e: CalendarEventDto) {
    const data: EventDialogData = { mode: 'edit', event: e };
    this.dialog.open(EventDialogComponent, { width: '450px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar evento',
      message: '¿Seguro que deseas eliminar este evento?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
