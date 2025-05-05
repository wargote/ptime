import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GymAttendanceDto } from '../../services/gym-attendance-api.service';

export type GymDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; session: GymAttendanceDto };

@Component({
  selector: 'pt-gym-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],  
  templateUrl: './gym-dialog.component.html',
  styleUrl: './gym-dialog.component.scss'
})
export class GymDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    date: ['', Validators.required]
  });

  constructor(
    private ref: MatDialogRef<GymDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GymDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.session,
        date: this.data.session.date.slice(0, 10)
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as GymAttendanceDto);
  }

  cancel() {
    this.ref.close(null);
  }
}
