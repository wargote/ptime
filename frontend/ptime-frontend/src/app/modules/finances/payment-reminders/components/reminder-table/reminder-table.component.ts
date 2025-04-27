import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaymentReminderDto } from '../../services/payment-reminder-api.service';

@Component({
  selector: 'pt-reminder-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './reminder-table.component.html',
  styleUrl: './reminder-table.component.scss'
})
export class ReminderTableComponent {
  @Input() reminders: PaymentReminderDto[] = [];
  @Output() edit   = new EventEmitter<PaymentReminderDto>();
  @Output() remove = new EventEmitter<string>();
}
