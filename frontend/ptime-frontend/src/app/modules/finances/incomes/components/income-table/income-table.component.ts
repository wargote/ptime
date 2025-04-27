import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IncomeDto } from '../../services/income-api.service';

@Component({
  selector: 'pt-income-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './income-table.component.html',
  styleUrl: './income-table.component.scss'
})
export class IncomeTableComponent {
  @Input() incomes: IncomeDto[] = [];
  @Output() edit   = new EventEmitter<IncomeDto>();
  @Output() remove = new EventEmitter<string>();
}
