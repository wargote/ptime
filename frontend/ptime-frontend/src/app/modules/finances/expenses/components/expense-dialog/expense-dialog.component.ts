import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseDto } from '../../services/expense-api.service';

export type ExpenseDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; expense: ExpenseDto };

@Component({
  selector: 'pt-expense-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.scss'
})
export class ExpenseDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id:    [''],      
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    tags: [''],
    date: ['', Validators.required],
    notes: ['']
  });

  constructor(
    private ref: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.expense,
        date: this.data.expense.date.slice(0, 10)         
      });
    }
  }

  save() {
  if (this.form.invalid) return;

  const dto = this.form.getRawValue();

  if (this.data.mode === 'create') {
    delete (dto as any).id;
  }

  this.ref.close(dto);

  }

  cancel() {
    this.ref.close(null);
  }
}
