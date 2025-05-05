import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TravelPlaceDto } from '../../services/travel-place-api.service';

export type PlaceDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; place: TravelPlaceDto };

@Component({
  selector: 'pt-place-dialog',
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
  templateUrl: './place-dialog.component.html',
  styleUrl: './place-dialog.component.scss'
})
export class PlaceDialogComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [''],
    type: ['Ciudad/Pais', Validators.required],
    name: ['', Validators.required],
    location: ['', Validators.required],
    state: ['Por visitar', Validators.required],
    notes: [''],
    photoUrl: ['']
  });

  constructor(
    private ref: MatDialogRef<PlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlaceDialogData
  ) {}

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue(this.data.place);
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue();
    if (this.data.mode === 'create') delete (dto as any).id;
    this.ref.close(dto as TravelPlaceDto);
  }
  
  cancel() {
    this.ref.close(null);
  }
}
