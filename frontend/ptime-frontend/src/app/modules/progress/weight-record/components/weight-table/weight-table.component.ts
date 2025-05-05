import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WeightRecordDto } from '../../services/weight-record-api.service';

@Component({
  selector: 'pt-weight-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './weight-table.component.html',
  styleUrl: './weight-table.component.scss'
})
export class WeightTableComponent {
  @Input() records: WeightRecordDto[] = [];
  @Output() edit   = new EventEmitter<WeightRecordDto>();
  @Output() remove = new EventEmitter<string>();
}
