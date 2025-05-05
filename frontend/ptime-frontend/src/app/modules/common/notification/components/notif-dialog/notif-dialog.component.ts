import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NotificationDto, NotifType, NotifStatus } from '../../services/notification-api.service';

export type NotifDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; notif: NotificationDto };

@Component({
  selector: 'pt-notif-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],  
  templateUrl: './notif-dialog.component.html',
  styleUrl: './notif-dialog.component.scss'
})
export class NotifDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    message: ['', Validators.required],
    type: ['Info' as NotifType, Validators.required],
    sentDate: ['', Validators.required],
    status: ['Pendiente' as NotifStatus, Validators.required]
  });

  constructor(
    private ref: MatDialogRef<NotifDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotifDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.notif,
        sentDate: this.data.notif.sentDate.slice(0, 16)   // para input datetime-local
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as NotificationDto);
  }
  
  cancel() {
    this.ref.close(null);
  }
}
