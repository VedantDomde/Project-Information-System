import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Perspective } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-perspective',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-perspective.component.html',
  styleUrl: './project-perspective.component.scss'
})
export class ProjectPerspectiveComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  perspectiveForm: FormGroup;
  submittedData: any[] = [];
  isEditing = false;
  editingPerspectiveId: number | null = null;
  editingProjectSrNo: number | null = null;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private perspective: Perspective,
    private router: Router
  ) {
    const storedProjectId = localStorage.getItem('projectId');
    const projectId = storedProjectId && !isNaN(+storedProjectId) ? +storedProjectId : null;

    this.perspectiveForm = this.fb.group({
      projectId: [projectId, Validators.required],
      file: [null],
      description: ['', Validators.required]
    });

    if (projectId !== null) {
      this.loadData(projectId);
    }
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.perspectiveForm.get('file')?.setValue(file);
    }
  }

  loadData(projectId: number): void {
    this.perspective.getProjectPerspectives(projectId).subscribe({
      next: (data: any[]) => {
        this.submittedData = data.map((item: any[]) => ({
          perspectiveId: item[3],
          Project_SrNo: item[23],
          Project_ID: projectId,
          fileName: item[24],
          filePath: item[25],
          description: item[26]
        }));
      },
      error: (err) => {
        alert('Failed to load data.');
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.perspectiveForm.invalid) {
      this.perspectiveForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    console.log( formData)
    formData.append('projectId', this.perspectiveForm.get('projectId')?.value);
    formData.append('description', this.perspectiveForm.get('description')?.value);

    const file = this.perspectiveForm.get('file')?.value;
    if (file) {
      formData.append('file', file);
    }

    if (this.isEditing && this.editingProjectSrNo !== null) {
      formData.append('Project_SrNo', this.editingProjectSrNo.toString());
      this.perspective.updateProject(formData).subscribe({
        next: () => {
          alert('Updated successfully!');
          this.loadData(this.perspectiveForm.get('projectId')?.value);
          this.openNewForm();
        },
        error: (err) => {
          console.error(err);
          alert('Update failed');
        }
      });
    } else {
      this.perspective.submitProject(formData).subscribe({
        next: () => {
          alert('Submitted successfully!');
          this.loadData(this.perspectiveForm.get('projectId')?.value);
          this.openNewForm();
        },
        error: (err) => {
          console.error(err);
          alert('Submission failed');
        }
      });
    }
  }

  deleteEntry(Project_SrNo: number): void {
    if (!confirm('Are you sure to delete this entry?')) return;

    this.perspective.deleteProject(Project_SrNo).subscribe({
      next: () => {
        alert('Deleted successfully!');
        this.loadData(this.perspectiveForm.get('projectId')?.value);
      },
      error: () => alert('Delete failed')
    });
  }

  editEntry(item: any): void {
    this.perspectiveForm.patchValue({
      projectId: item.Project_ID || this.perspectiveForm.get('projectId')?.value,
      description: item.description,
      file: null // user has to reselect file
    });

    this.editingProjectSrNo = item.Project_SrNo;
    this.isEditing = true;
  }

  openNewForm(): void {
    this.perspectiveForm.reset({
      projectId: this.perspectiveForm.get('projectId')?.value,
      file: null,
      description: ''
    });
    this.isEditing = false;
    this.editingProjectSrNo = null;
     if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}

