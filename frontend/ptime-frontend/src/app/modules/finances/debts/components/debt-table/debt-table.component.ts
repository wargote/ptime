import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DebtDto } from '../../services/debt-api.service';

@Component({
  selector: 'pt-debt-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './debt-table.component.html',
  styleUrl: './debt-table.component.scss'
})
export class DebtTableComponent {
  @Input() debts: DebtDto[] = [];
  @Output() edit   = new EventEmitter<DebtDto>();
  @Output() remove = new EventEmitter<string>();
}
