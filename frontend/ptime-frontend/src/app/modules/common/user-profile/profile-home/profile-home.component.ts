import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UserProfileApiService, UserProfileDto } from '../services/user-profile-api.service';
import { ProfileTableComponent } from '../components/profile-table/profile-table.component';
import { ProfileDialogComponent, ProfileDialogData } from '../components/profile-dialog/profile-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'pt-profile-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ProfileTableComponent],
  templateUrl: './profile-home.component.html',
  styleUrl: './profile-home.component.scss'
})
export class ProfileHomeComponent implements OnInit {
  private api    = inject(UserProfileApiService);
  private dialog = inject(MatDialog);

  profiles: UserProfileDto[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getAll().subscribe({
      next: d => (this.profiles = d),
      error: _ => (this.error = 'Error'),
      complete: () => (this.loading = false)
    });
  }

  add() {
    const data: ProfileDialogData = { mode: 'create' };
    this.dialog.open(ProfileDialogComponent, { width: '500px', data })
      .afterClosed().subscribe(r => { if (r) this.api.create(r).subscribe(() => this.load()); });
  }

  edit(p: UserProfileDto) {
    const data: ProfileDialogData = { mode: 'edit', profile: p };
    this.dialog.open(ProfileDialogComponent, { width: '500px', data })
      .afterClosed().subscribe(r2 => { if (r2) this.api.update(r2).subscribe(() => this.load()); });
  }

  remove(id: string) {
    const data: ConfirmDialogData = {
      title: 'Eliminar perfil',
      message: '¿Seguro que deseas eliminar este perfil?',
      okText: 'Eliminar'
    };
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed().subscribe(c => { if (c) this.api.delete(id).subscribe(() => this.load()); });
  }
}
