import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ShoppingItemApiService, ShoppingItemDto } from '../services/shopping-item-api.service';
import { ItemTableComponent } from '../components/shopping-table/shopping-table.component';
import { ItemDialogComponent, ItemDialogData } from '../components/shopping-dialog/shopping-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-shopping-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ItemTableComponent],
  templateUrl: './shopping-home.component.html',
  styleUrl: './shopping-home.component.scss'
})
export class ShoppingHomeComponent implements OnInit {
  private api    = inject(ShoppingItemApiService);
  private dialog = inject(MatDialog);

  items: ShoppingItemDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getItems().subscribe({
      next: d => (this.items = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: ItemDialogData = { mode: 'create' };
    this.dialog.open(ItemDialogComponent, { width: '450px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(i: ShoppingItemDto) {
    const data: ItemDialogData = { mode: 'edit', item: i };
    this.dialog.open(ItemDialogComponent, { width: '450px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar ítem',
      message: '¿Seguro que deseas eliminar este ítem de la lista?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
