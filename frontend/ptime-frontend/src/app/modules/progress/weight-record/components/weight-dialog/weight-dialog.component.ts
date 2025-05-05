import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WeightRecordDto } from '../../services/weight-record-api.service';

export type WeightDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; record: WeightRecordDto };

@Component({
  selector: 'pt-weight-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],  
  templateUrl: './weight-dialog.component.html',
  styleUrl: './weight-dialog.component.scss'
})
export class WeightDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    date: ['', Validators.required],
    weight: [0, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private ref: MatDialogRef<WeightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WeightDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.record,
        date: this.data.record.date.slice(0, 10)
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as WeightRecordDto);
  }

  cancel() {
    this.ref.close(null);
  }
}
