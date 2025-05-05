import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DebtDto } from '../../services/debt-api.service';
import { MatSelectModule } from '@angular/material/select';


export type DebtDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; debt: DebtDto };
  
@Component({
  selector: 'pt-debt-dialog',
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
  templateUrl: './debt-dialog.component.html',
  styleUrl: './debt-dialog.component.scss'
})
export class DebtDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    description: ['', Validators.required],
    totalAmount: [0, [Validators.required, Validators.min(0.01)]],
    paidAmount:  [0, [Validators.required, Validators.min(0)]],
    dueDate: ['', Validators.required],
    status: ['Pendiente', Validators.required]
  });

  constructor(
    private ref: MatDialogRef<DebtDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DebtDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.debt,
        dueDate: this.data.debt.dueDate.slice(0, 10)
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as DebtDto);
  }

  cancel() {
    this.ref.close(null);
  }
}
