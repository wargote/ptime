import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IncomeDto } from '../../services/income-api.service';

export type IncomeDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; income: IncomeDto };

@Component({
  selector: 'pt-income-dialog',
  standalone: true,
   imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './income-dialog.component.html',
  styleUrl: './income-dialog.component.scss'
})
export class IncomeDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    tags: [''],
    date: ['', Validators.required],
    notes: ['']
  });

  constructor(
    private ref: MatDialogRef<IncomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncomeDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.income,
        date: this.data.income.date.slice(0, 10)
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as IncomeDto);
  }

  cancel() {
    this.ref.close(null);
  }
}
