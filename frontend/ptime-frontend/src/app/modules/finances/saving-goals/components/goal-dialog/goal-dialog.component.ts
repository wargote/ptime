import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SavingGoalDto } from '../../services/saving-goal-api.service';
import { MatSelectModule } from '@angular/material/select';


export type GoalDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; goal: SavingGoalDto };

@Component({
  selector: 'pt-goal-dialog',
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
  templateUrl: './goal-dialog.component.html',
  styleUrl: './goal-dialog.component.scss'
})
export class GoalDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    targetAmount: [0, [Validators.required, Validators.min(0.01)]],
    savedAmount:  [0, [Validators.required, Validators.min(0)]],
    deadline: ['', Validators.required],
    notes: ['']
  });

  constructor(
    private ref: MatDialogRef<GoalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GoalDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.goal,
        deadline: this.data.goal.deadline.slice(0, 10)
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as SavingGoalDto);
  }

  cancel() {
    this.ref.close(null);
  }
}
