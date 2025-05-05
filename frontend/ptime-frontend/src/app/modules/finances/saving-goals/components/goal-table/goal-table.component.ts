import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SavingGoalDto } from '../../services/saving-goal-api.service';

@Component({
  selector: 'pt-goal-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './goal-table.component.html',
  styleUrl: './goal-table.component.scss'
})
export class GoalTableComponent {
  @Input() goals: SavingGoalDto[] = [];
  @Output() edit   = new EventEmitter<SavingGoalDto>();
  @Output() remove = new EventEmitter<string>();
}
