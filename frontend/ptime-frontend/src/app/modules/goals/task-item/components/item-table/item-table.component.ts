import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskItemDto } from '../../services/task-item-api.service';

@Component({
  selector: 'pt-item-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './item-table.component.html',
  styleUrl: './item-table.component.scss'
})
export class ItemTableComponent {
  @Input() tasks: TaskItemDto[] = [];
  @Output() edit   = new EventEmitter<TaskItemDto>();
  @Output() remove = new EventEmitter<string>();
}
