
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ProjectTimeLimitExtensionService } from '../services/services.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-time-limit-extension',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './time-limit-extension.component.html',
//   styleUrl: './time-limit-extension.component.scss'
// })
// export class TimeLimitExtensionComponent {
//   projectForm: FormGroup;
//   submittedData: any[] = [];
//   uploadedFile: File | null = null;
//   userId: string | null = null;  

//   constructor(
//     private fb: FormBuilder,
//     private extensionService: ProjectTimeLimitExtensionService,
//     private router: Router
//   ) {
//     this.projectForm = this.fb.group({
//       extensionDate: ['', Validators.required],
//       timeLimit: [0, [Validators.required, Validators.min(1)]],
//       uploadFile: [null, Validators.required]
//     });
//   }
//   ngOnInit(): void {
//     this.userId = localStorage.getItem('userId');
//     if (!this.userId) {
//       this.router.navigate(['/login']);
//       return;
//     }}

//   onFileChange(event: any) {
//     const file = event.target.files?.[0];
//     if (file) {
//       this.uploadedFile = file;
//       this.projectForm.patchValue({ uploadFile: file });
//     }
//   }

//   onSubmit() {
//     if (this.projectForm.invalid || !this.uploadedFile) {
//       return;
//     }

//     const formData = new FormData();
    
//     const projectId = localStorage.getItem('projectId');
//     console.log('Project ID:', projectId);

//     formData.append('projectId', projectId || '0');
//     formData.append('extensionDate', this.projectForm.get('extensionDate')?.value);
//     formData.append('timeLimit', this.projectForm.get('timeLimit')?.value);
//     formData.append('file', this.uploadedFile); // Key must match backend
//     console.log('Form Data:', formData);
    

//     this.extensionService.submitExtension(formData).subscribe({
//       next: (res) => {
//         alert('Project extension submitted!');
//         this.submittedData.push({
//           projectId,
//           extensionDate: this.projectForm.get('extensionDate')?.value,
//           timeLimit: this.projectForm.get('timeLimit')?.value,
//           uploadFileName: this.uploadedFile?.name
//         });
//         this.resetForm();
//       },
//       error: (err) => {
//         console.error('❌ Submission failed:', err);
//         alert('Submission failed. Check console.');
//       }
//     });
//   }

//   resetForm() {
//     this.projectForm.reset();
//     this.uploadedFile = null;
//   }

//   deleteEntry(index: number) {
//     this.submittedData.splice(index, 1);
//   }

//   getProjectName(id: string | number) {
//     switch (id) {
//       case '1': return 'Project 1';
//       case '2': return 'Project 2';
//       default: return 'Unknown Project';
//     }
//   }
// }
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectTimeLimitExtensionService } from '../services/services.service';

@Component({
  selector: 'app-time-limit-extension',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './time-limit-extension.component.html',
  styleUrl: './time-limit-extension.component.scss'
})
export class TimeLimitExtensionComponent {
    @ViewChild('fileInput') fileInput!: ElementRef;
  projectForm: FormGroup;
  submittedData: any[] = [];
  uploadedFile: File | null = null;
  userId: string | null = null;
  isEditing = false;
  editingSrNo: number | null = null;

  constructor(
    private fb: FormBuilder,
    private extensionService: ProjectTimeLimitExtensionService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      extensionDate: ['', Validators.required],
      timeLimit: [0, [Validators.required, Validators.min(1)]],
      uploadFile: [null] // file upload is optional on update
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.getExtensions();
  }

  getExtensions() {
    const projectId = localStorage.getItem('projectId');
    if (!projectId) return;

    this.extensionService.getExtensionsByProjectId(+projectId).subscribe({
      next: (res: any[]) => {
        this.submittedData = res.map(item => ({
          extensionSrNo: item[23],
          projectId: item[3],
          extensionDate: item[24],
          timeLimit: item[25],
          filePath: item[26],
          fileName: item[27]
        }));
      },
      error: (err) => console.error('❌ Fetch error:', err)
    });
  }

  onFileChange(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.uploadedFile = file;
    }
  }

  onSubmit() {
    if (this.projectForm.invalid) return;

    const projectId = localStorage.getItem('projectId');
    if (!projectId) {
      alert('Project ID not found!');
      return;
    }

    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('extensionDate', this.projectForm.get('extensionDate')?.value);
    formData.append('timeLimit', this.projectForm.get('timeLimit')?.value);
    if (this.uploadedFile) formData.append('file', this.uploadedFile);

    if (this.isEditing && this.editingSrNo) {
      formData.append('extensionSrNo', this.editingSrNo.toString());

      this.extensionService.updateExtension(formData).subscribe({
        next: () => {
          alert('✅ Extension updated!');
          this.getExtensions();
          this.resetForm();
        },
        error: (err) => {
          console.error('❌ Update failed:', err);
          alert('Update failed');
        }
      });
    } else {
      this.extensionService.submitExtension(formData).subscribe({
        next: () => {
          alert('✅ Extension submitted!');
          this.getExtensions();
          this.resetForm();
        },
        error: (err) => {
          console.error('❌ Submission failed:', err);
          alert('Submission failed');
        }
      });
    }
  }

  resetForm() {
    this.projectForm.reset();
    this.uploadedFile = null;
    this.isEditing = false;
    this.editingSrNo = null;
     if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  editExtension(extension: any) {
    this.projectForm.setValue({
      extensionDate: extension.extensionDate.split('T')[0],
      timeLimit: extension.timeLimit,
      uploadFile: ''
    });
    this.isEditing = true;
    this.editingSrNo = extension.extensionSrNo;
  }

  deleteExtension(extensionSrNo: number) {
    if (!confirm('Are you sure you want to delete this extension?')) return;

    this.extensionService.deleteExtension({ extension_SrNo: extensionSrNo }).subscribe({
      next: () => {
        alert('🗑️ Extension deleted');
        this.getExtensions();
      },
      error: (err) => {
        console.error('❌ Delete failed:', err);
        alert('Delete failed');
      }
    });
  }
}

