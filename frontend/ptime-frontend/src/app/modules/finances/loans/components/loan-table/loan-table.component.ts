import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoanDto } from '../../services/loan-api.service';

@Component({
  selector: 'pt-loan-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './loan-table.component.html',
  styleUrl: './loan-table.component.scss'
})
export class LoanTableComponent {
  @Input() loans: LoanDto[] = [];
  @Output() edit   = new EventEmitter<LoanDto>();
  @Output() remove = new EventEmitter<string>();
}
