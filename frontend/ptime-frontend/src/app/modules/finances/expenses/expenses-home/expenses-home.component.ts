import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseApiService, ExpenseDto } from '../services/expense-api.service';
import { ExpenseTableComponent } from '../components/expense-table/expense-table.component';
import { ExpenseDialogComponent, ExpenseDialogData } from '../components/expense-dialog/expense-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'pt-expenses-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ExpenseTableComponent],
  templateUrl: './expenses-home.component.html',
  styleUrl: './expenses-home.component.scss'
})
export class ExpensesHomeComponent implements OnInit{
  private api    = inject(ExpenseApiService);
  private dialog = inject(MatDialog);

  expenses: ExpenseDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getExpenses().subscribe({
      next: d => (this.expenses = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: ExpenseDialogData = { mode: 'create' };
    this.dialog.open(ExpenseDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(e: ExpenseDto) {
    const data: ExpenseDialogData = { mode: 'edit', expense: e };
    this.dialog.open(ExpenseDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.update(r).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar gasto',
      message: '¿Seguro que deseas eliminar este gasto?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
