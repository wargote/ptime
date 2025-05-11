import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { IncomeApiService, IncomeDto } from '../services/income-api.service';
import { IncomeTableComponent } from '../components/income-table/income-table.component';
import { IncomeDialogComponent, IncomeDialogData } from '../components/income-dialog/income-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-incomes-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, IncomeTableComponent, MatCardModule],
  templateUrl: './incomes-home.component.html',
  styleUrl: './incomes-home.component.scss'
})
export class IncomesHomeComponent implements OnInit {
  private api    = inject(IncomeApiService);
  private dialog = inject(MatDialog);

  incomes: IncomeDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getIncomes().subscribe({
      next: d => (this.incomes = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: IncomeDialogData = { mode: 'create' };
    this.dialog.open(IncomeDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(i: IncomeDto) {
    const data: IncomeDialogData = { mode: 'edit', income: i };
    this.dialog.open(IncomeDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar ingreso',
      message: '¿Seguro que deseas eliminar este ingreso?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
