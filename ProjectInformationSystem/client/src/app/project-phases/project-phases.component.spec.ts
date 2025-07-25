import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-phases',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-phases.component.html',
  styleUrl: './project-phases.component.scss'
})
export class ProjectPhasesComponent {
  combinedForm: FormGroup;
  combinedData: any[] = [];

  constructor(private fb: FormBuilder) {
    this.combinedForm = this.fb.group({
      projectId: ['', Validators.required],
      phaseDate: ['', Validators.required],
      phase: ['', Validators.required],
      appointment: ['', Validators.required],
      remark: ['', Validators.required],
      documentSrNo: ['', Validators.required],
      documentName: ['', Validators.required],
      fileUpload: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.combinedForm.valid) {
      const formData = { ...this.combinedForm.value };
      formData.fileUpload = formData.fileUpload?.name; // store file name only
      this.combinedData.push(formData);
      this.combinedForm.reset();
      alert('Form submitted successfully ✅');
    } else {
      alert('Please complete all fields before submitting.');
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.combinedForm.patchValue({ fileUpload: file });
    }
  }

  deleteEntry(index: number) {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.combinedData.splice(index, 1);
    }
  }
}
