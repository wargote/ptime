import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotificationDto } from '../../services/notification-api.service';

@Component({
  selector: 'pt-notif-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './notif-table.component.html',
  styleUrl: './notif-table.component.scss'
})
export class NotifTableComponent {
  @Input() notifications: NotificationDto[] = [];
  @Output() edit   = new EventEmitter<NotificationDto>();
  @Output() remove = new EventEmitter<string>();
}
