import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { saveTurf } from '../store/turf.actions';
import { selectSaveTurfSuccess } from '../store/turf.selectors';

@Component({
  selector: 'app-turf-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './turf-dialog.component.html',
})
export class TurfDialogComponent implements OnInit {
  turfForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview!: string | null;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<TurfDialogComponent>
  ) {}
  

  ngOnInit(): void {
    this.turfForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      pricePerHour: [100, [Validators.required, Validators.min(100)]],
      capacity: [1, [Validators.required, Validators.min(1)]]
    });

    this.store.select(selectSaveTurfSuccess).subscribe(success => {
      if (success) {
        this.dialogRef.close();
      }
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  

  onSave() {
    if (this.turfForm.valid) {
      const formValue = this.turfForm.getRawValue();
      const formData = new FormData();

      // Append form data
      formData.append('name', formValue.name);
      formData.append('location', formValue.location);
      formData.append('pricePerHour', formValue.pricePerHour);
      formData.append('capacity', formValue.capacity);

      // Append image if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Dispatch to NgRx store
      this.store.dispatch(saveTurf({ formData }));
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
