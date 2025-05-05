import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LoanApiService, LoanDto } from '../services/loan-api.service';
import { LoanTableComponent } from '../components/loan-table/loan-table.component';
import { LoanDialogComponent, LoanDialogData } from '../components/loan-dialog/loan-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-loans-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, LoanTableComponent],
  templateUrl: './loans-home.component.html',
  styleUrl: './loans-home.component.scss'
})
export class LoansHomeComponent implements OnInit {
  private api    = inject(LoanApiService);
  private dialog = inject(MatDialog);

  loans: LoanDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getLoans().subscribe({
      next: d => (this.loans = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: LoanDialogData = { mode: 'create' };
    this.dialog.open(LoanDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(l: LoanDto) {
    const data: LoanDialogData = { mode: 'edit', loan: l };
    this.dialog.open(LoanDialogComponent, { width: '400px', data })
      .afterClosed().subscribe(r => { if (r) this.api.update(r).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar préstamo',
      message: '¿Seguro que deseas eliminar este préstamo?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
