import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TaskItemDto } from '../../services/task-item-api.service';

export type ItemDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; task: TaskItemDto };

@Component({
  selector: 'pt-item-dialog',
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
  templateUrl: './item-dialog.component.html',
  styleUrl: './item-dialog.component.scss'
})
export class ItemDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: [''],
    status: ['Pendiente', Validators.required],
    dueDate: ['', Validators.required],
    priority: [3, [Validators.required, Validators.min(1), Validators.max(5)]]
  });

  constructor(
    private ref: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.task,
        dueDate: this.data.task.dueDate.slice(0, 10)
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as TaskItemDto);
  }
  
  cancel() {
    this.ref.close(null);
  }

}
