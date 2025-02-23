import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './turf-dialog.component.html',
})
export class TurfDialogComponent implements OnInit {
  turfForm!: FormGroup;
  selectedFile = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<TurfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecting existing turf data for edit
  ) {}

  ngOnInit(): void {
    this.turfForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      location: [this.data?.location || '', Validators.required],
      pricePerHour: [this.data?.pricePerHour || 100, [Validators.required, Validators.min(100)]],
      capacity: [this.data?.capacity || 1, [Validators.required, Validators.min(1)]],
    });

    // ✅ Load existing image in edit mode
    if (this.data?.imageUrl) {
      this.imagePreview.set(this.data.imageUrl);
    }

    this.store.select(selectSaveTurfSuccess).subscribe(success => {
      if (success) {
        this.dialogRef.close(true);
      }
    });
  }

  // ✅ Handle file selection and update preview
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file); // ✅ Store selected file

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview.set(e.target.result); // ✅ Update preview
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    if (this.turfForm.valid) {
      const formValue = this.turfForm.getRawValue();
      const formData = new FormData();
  
      // Append all form data
      if (this.data?.id) {
        formData.append('id', this.data.id.toString()); 
      } 
      formData.append('name', formValue.name);
      formData.append('location', formValue.location);
      formData.append('pricePerHour', formValue.pricePerHour.toString());
      formData.append('capacity', formValue.capacity.toString());
      formData.append('createdAt', this.data?.createdAt || ''); // Keep original created date
      formData.append('updatedAt', new Date().toISOString()); // Set new updated timestamp
      formData.append('deletedAt', this.data?.deletedAt || ''); // Preserve deletedAt if exists
  
      // Append existing image URL if no new image is selected
      if (this.selectedFile()) {
        formData.append('image', this.selectedFile() as File);
      } 
      // else {
      //   formData.append('imageUrl', this.data?.imageUrl || ''); // Keep existing image
      // }
  
      // Dispatch the save action with full data
      this.store.dispatch(saveTurf({ formData }));
    }
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}
