import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DebtApiService, DebtDto } from '../services/debt-api.service';
import { DebtTableComponent } from '../components/debt-table/debt-table.component';
import { DebtDialogComponent, DebtDialogData } from '../components/debt-dialog/debt-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-debts-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, DebtTableComponent, MatCardModule],
  templateUrl: './debts-home.component.html',
  styleUrl: './debts-home.component.scss'
})
export class DebtsHomeComponent implements OnInit{
  private api    = inject(DebtApiService);
  private dialog = inject(MatDialog);

  debts: DebtDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getDebts().subscribe({
      next: d => (this.debts = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: DebtDialogData = { mode: 'create' };
    this.dialog.open(DebtDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(d: DebtDto) {
    const data: DebtDialogData = { mode: 'edit', debt: d };
    this.dialog.open(DebtDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.update(r).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar deuda',
      message: '¿Seguro que deseas eliminar esta deuda?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
