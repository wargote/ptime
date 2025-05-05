import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingItemDto, ItemStatus } from '../../services/shopping-item-api.service';

export type ItemDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; item: ShoppingItemDto };

@Component({
  selector: 'pt-shopping-dialog',
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
  templateUrl: './shopping-dialog.component.html',
  styleUrl: './shopping-dialog.component.scss'
})
export class ItemDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    category: ['', Validators.required],
    status: ['Pendiente' as ItemStatus, Validators.required],
    createdDate: ['', Validators.required],
    notes: ['']
  });

  constructor(
    private ref: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue({
        ...this.data.item,
        createdDate: this.data.item.createdDate.slice(0, 10)
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as ShoppingItemDto);
  }

  cancel() {
    this.ref.close(null);
  }
}
