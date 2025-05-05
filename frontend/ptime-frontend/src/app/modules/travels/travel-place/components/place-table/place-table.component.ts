import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TravelPlaceDto } from '../../services/travel-place-api.service';

@Component({
  selector: 'pt-place-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './place-table.component.html',
  styleUrl: './place-table.component.scss'
})
export class PlaceTableComponent {
  @Input() places: TravelPlaceDto[] = [];
  @Output() edit   = new EventEmitter<TravelPlaceDto>();
  @Output() remove = new EventEmitter<string>();
}
