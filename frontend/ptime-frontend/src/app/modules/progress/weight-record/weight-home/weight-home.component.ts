import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { WeightRecordApiService, WeightRecordDto } from '../services/weight-record-api.service';
import { WeightTableComponent } from '../components/weight-table/weight-table.component';
import { WeightDialogComponent, WeightDialogData } from '../components/weight-dialog/weight-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-weight-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, WeightTableComponent],
  templateUrl: './weight-home.component.html',
  styleUrl: './weight-home.component.scss'
})
export class WeightHomeComponent implements OnInit {
  private api    = inject(WeightRecordApiService);
  private dialog = inject(MatDialog);

  records: WeightRecordDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getRecords().subscribe({
      next: d => (this.records = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: WeightDialogData = { mode: 'create' };
    this.dialog.open(WeightDialogComponent, { width: '350px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(w: WeightRecordDto) {
    const data: WeightDialogData = { mode: 'edit', record: w };
    this.dialog.open(WeightDialogComponent, { width: '350px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar registro',
      message: '¿Seguro que deseas eliminar este registro de peso?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
