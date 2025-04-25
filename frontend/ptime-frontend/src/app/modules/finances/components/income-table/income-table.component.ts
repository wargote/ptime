import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeDto } from '../../services/finance-api.service';

@Component({
  selector: 'pt-income-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './income-table.component.html',
  styleUrl: './income-table.component.scss'
})
export class IncomeTableComponent {
  @Input() incomes: IncomeDto[] = [];
}
