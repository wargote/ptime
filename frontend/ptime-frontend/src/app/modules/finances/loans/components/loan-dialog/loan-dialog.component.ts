import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoanDto } from '../../services/loan-api.service';
import { MatSelectModule } from '@angular/material/select';

export type LoanDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; loan: LoanDto };

@Component({
  selector: 'pt-loan-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './loan-dialog.component.html',
  styleUrl: './loan-dialog.component.scss'
})
export class LoanDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    type: ['', Validators.required],
    description: [''],
    dueDate: ['', Validators.required],
    status: ['Pendiente', Validators.required]
  });

  constructor(
    private ref: MatDialogRef<LoanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoanDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.loan,
        dueDate: this.data.loan.dueDate.slice(0, 10)
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as LoanDto);
  }
  
  cancel() {
    this.ref.close(null);
  }
}
