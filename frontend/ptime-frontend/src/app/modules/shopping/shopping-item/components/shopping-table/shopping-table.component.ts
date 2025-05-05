import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingItemDto } from '../../services/shopping-item-api.service';

@Component({
  selector: 'pt-shopping-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './shopping-table.component.html',
  styleUrl: './shopping-table.component.scss'
})
export class ItemTableComponent {
  @Input() items: ShoppingItemDto[] = [];
  @Output() edit   = new EventEmitter<ShoppingItemDto>();
  @Output() remove = new EventEmitter<string>();
}
