import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileDto } from '../../services/user-profile-api.service';

@Component({
  selector: 'pt-profile-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './profile-table.component.html',
  styleUrl: './profile-table.component.scss'
})
export class ProfileTableComponent {
  @Input() profiles: UserProfileDto[] = [];
  @Output() edit   = new EventEmitter<UserProfileDto>();
  @Output() remove = new EventEmitter<string>();
}
