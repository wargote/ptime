import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceApiService, IncomeDto } from '../services/finance-api.service';
import { IncomeTableComponent } from '../components/income-table/income-table.component';


@Component({
  selector: 'pt-finance-home',
  standalone: true,
  imports: [CommonModule, IncomeTableComponent],
  templateUrl: './finance-home.component.html',
  styleUrl: './finance-home.component.scss'
})
export class FinanceHomeComponent  implements OnInit {
  private api = inject(FinanceApiService);

  incomes: IncomeDto[] = [];
  loading = false;
  error = '';

  ngOnInit() {
    this.loading = true;
    this.api.getIncomes().subscribe({
      next: data => { this.incomes = data; this.loading = false; },
      error: _ => { this.error = 'No se pudo cargar'; this.loading = false; }
    });
  }

  
  abrirModal() {
    console.log('Abrir modal (pendiente de implementar)');
  }
}
