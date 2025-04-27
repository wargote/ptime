import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseDto } from '../../services/expense-api.service';

@Component({
  selector: 'pt-expense-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent {
  @Input() expenses: ExpenseDto[] = [];
  @Output() edit   = new EventEmitter<ExpenseDto>();
  @Output() remove = new EventEmitter<string>();
}
