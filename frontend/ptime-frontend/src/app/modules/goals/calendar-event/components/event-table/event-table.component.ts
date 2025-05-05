import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CalendarEventDto } from '../../services/calendar-event-api.service';

@Component({
  selector: 'pt-event-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.scss'
})
export class EventTableComponent {
  @Input() events: CalendarEventDto[] = [];
  @Output() edit   = new EventEmitter<CalendarEventDto>();
  @Output() remove = new EventEmitter<string>();
}
