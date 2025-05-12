import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { TravelPlaceApiService, TravelPlaceDto } from '../services/travel-place-api.service';
import { PlaceTableComponent } from '../components/place-table/place-table.component';
import { PlaceDialogComponent, PlaceDialogData } from '../components/place-dialog/place-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-travel-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, PlaceTableComponent, MatCardModule],
  templateUrl: './travel-home.component.html',
  styleUrl: './travel-home.component.scss'
})
export class TravelHomeComponent implements OnInit {
  private api    = inject(TravelPlaceApiService);
  private dialog = inject(MatDialog);

  places: TravelPlaceDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getPlaces().subscribe({
      next: d => (this.places = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: PlaceDialogData = { mode: 'create' };
    this.dialog.open(PlaceDialogComponent, { width: '500px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(p: TravelPlaceDto) {
    const data: PlaceDialogData = { mode: 'edit', place: p };
    this.dialog.open(PlaceDialogComponent, { width: '500px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar lugar',
      message: '¿Seguro que deseas eliminar este lugar?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
