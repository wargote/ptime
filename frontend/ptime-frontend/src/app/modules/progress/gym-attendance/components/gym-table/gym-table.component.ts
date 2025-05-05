import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GymAttendanceDto } from '../../services/gym-attendance-api.service';

@Component({
  selector: 'pt-gym-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './gym-table.component.html',
  styleUrl: './gym-table.component.scss'
})
export class GymTableComponent {
  @Input() sessions: GymAttendanceDto[] = [];
  @Output() edit   = new EventEmitter<GymAttendanceDto>();
  @Output() remove = new EventEmitter<string>();
}
