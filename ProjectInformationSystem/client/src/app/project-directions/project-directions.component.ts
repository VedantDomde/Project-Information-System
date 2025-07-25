// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-project-directions',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, FormsModule],
//   templateUrl: './project-directions.component.html',
//   styleUrls: ['./project-directions.component.scss']
// })
// export class DirectionsComponent implements OnInit {
//   directionsForm: FormGroup;
//   authorities: { id: string, name: string }[] = [];
//   submittedData: any | null = null;
//   selectedFile: File | null = null;
//   userId: string | null = null;

//   constructor(private fb: FormBuilder,private router: Router) {
//     this.directionsForm = this.fb.group({
//       authorityId: ['', Validators.required],
//       projectId: [localStorage.getItem('projectId') || '', Validators.required],
//       shortNote: ['', Validators.required],
//       directionDate: ['', Validators.required],
//       actionDate: [''],
//       actionDesc: [''],
//       file: [null]
//     });
//   }
  

//   // ngOnInit(): void {
//   //   this.loadAuthorities();
//   // }
//   ngOnInit(): void {
//     this.userId = localStorage.getItem('userId');
//     if (!this.userId) {
//       this.router.navigate(['/login']);
//       return;
//     }
//      this.loadAuthorities();
//   }

//   // ✅ Convert raw array to usable object array
//   loadAuthorities(): void {
//     const rawAuthorityArray = [
//       ["1", "Hon'ble Chief Minister"],
//       ["2", "Hon'ble Guardian Minister"],
//       ["3", "Hon'ble UD Minister"],
//       ["4", "Hon'ble Chief Secretary"],
//       ["5", "Hon'ble Principle Secretary"],
//       ["6", "Hon'ble Member of Parliament"],
//       ["7", "Hon'ble Member of Legislative Assembly"],
//       ["8", "Hon'ble Chairman NIT / Metropolitan Commissioner"],
//       ["9", "Superintending Engineer"],
//       ["10", "Executive Engineer"],
//       ["11", "Technical Personnel"]
//     ];

//     this.authorities = rawAuthorityArray.map(([id, name]) => ({ id, name }));
//   }

//   onFileChange(event: Event): void {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       this.selectedFile = file;
//       this.directionsForm.patchValue({ file });
//     }
//   }

//   onSubmit(): void {
//     if (this.directionsForm.invalid) {
//       this.directionsForm.markAllAsTouched();
//       return;
//     }

//     const formData = new FormData();
//     formData.append('authorityId', this.directionsForm.get('authorityId')?.value);
//     formData.append('projectId', this.directionsForm.get('projectId')?.value);
//     formData.append('shortNote', this.directionsForm.get('shortNote')?.value);
//     formData.append('directionDate', this.directionsForm.get('directionDate')?.value);
//     formData.append('actionDate', this.directionsForm.get('actionDate')?.value || '');
//     formData.append('actionDesc', this.directionsForm.get('actionDesc')?.value || '');
//     if (this.selectedFile) {
//       formData.append('file', this.selectedFile);
//     }

//     // For now, mock store in submittedData
//     this.submittedData = {
//       authorityId: this.directionsForm.get('authorityId')?.value,
//       projectId: this.directionsForm.get('projectId')?.value,
//       shortNote: this.directionsForm.get('shortNote')?.value,
//       directionDate: this.directionsForm.get('directionDate')?.value,
//       actionDate: this.directionsForm.get('actionDate')?.value,
//       actionDesc: this.directionsForm.get('actionDesc')?.value,
//       fileName: this.selectedFile?.name || 'No file'
//     };

//     alert('✅ Direction submitted!');
//     this.onNew();
//   }

//   onNew(): void {
//     this.directionsForm.reset({
//       authorityId: '',
//       projectId: localStorage.getItem('projectId') || '',
//       shortNote: '',
//       directionDate: '',
//       actionDate: '',
//       actionDesc: '',
//       file: null
//     });
//     this.selectedFile = null;
//   }

//   deleteSubmittedData(): void {
//     this.submittedData = null;
//     this.directionsForm.reset({
//       authorityId: '',
//       projectId: localStorage.getItem('projectId') || ''
//     });
//   }

//   getAuthorityName(id: string): string {
//     const auth = this.authorities.find(a => a.id === id);
//     return auth ? auth.name : 'Unknown';
//   }
// }

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DirectionsService } from '../services/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-directions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-directions.component.html',
  styleUrls: ['./project-directions.component.scss']
})
export class DirectionsComponent implements OnInit {
   @ViewChild('fileInput') fileInput!: ElementRef;
  directionsForm: FormGroup;
  authorities: { id: string, name: string }[] = [];
  submittedData: any[] = [];
  selectedFile: File | null = null;
  userId: string | null = null;
  isUpdateMode = false;
  currentSrNo: number | null = null;

  constructor(
    private fb: FormBuilder,
    private directionsService: DirectionsService,
    private router: Router
  ) {
    this.directionsForm = this.fb.group({
      authorityId: ['', Validators.required],
      projectId: [localStorage.getItem('projectId') || '', Validators.required],
      shortNote: ['', Validators.required],
      directionDate: ['', Validators.required],
      actionDate: [''],
      actionDesc: [''],
      file: [null]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
     // Manually set authorities
  this.authorities = [
    { id: "1", name: "Hon'ble Chief Minister" },
    { id: "2", name: "Hon'ble Guardian Minister" },
    { id: "3", name: "Hon'ble UD Minister" },
    { id: "4", name: "Hon'ble Chief Secretary" },
    { id: "5", name: "Hon'ble Principle Secretary" },
    { id: "6", name: "Hon'ble Member of Parliament" },
    { id: "7", name: "Hon'ble Member of Legislative Assembly" },
    { id: "8", name: "Hon'ble Chairman NIT / Metropolitan Commissioner" },
    { id: "9", name: "Superintending Engineer" },
    { id: "10", name: "Executive Engineer" },
    { id: "11", name: "Technical Personnel" }
  ];
    this.fetchDirections();
  }

  fetchDirections() {
    const project_id = localStorage.getItem('projectId');
    if (!project_id) return;
    this.directionsService.getDirections(+project_id).subscribe(
      (res: any[]) => {
        this.submittedData = res.map((item) => ({
          direction_srno: item[23],
          authority_id: item[24],
          project_id: item[3],
          direction_date: item[26],
          directions_short_note: item[27],
          action_date: item[28],
          action_desc: item[29],
          file_path: item[30],
          file_name: item[31]
        }));
      },
      (err) => console.error('Fetch error', err)
    );
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.directionsForm.patchValue({ file });
    }
  }

  onSubmit(): void {
    if (this.directionsForm.invalid) return;
    const formData = new FormData();
    formData.append('authority_id', this.directionsForm.value.authorityId);
    formData.append('project_id', this.directionsForm.value.projectId);
    formData.append('direction_date', this.directionsForm.value.directionDate);
    formData.append('directions_short_note', this.directionsForm.value.shortNote);
    formData.append('action_date', this.directionsForm.value.actionDate || '');
    formData.append('action_desc', this.directionsForm.value.actionDesc || '');
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.isUpdateMode && this.currentSrNo !== null) {
      formData.append('direction_srno', this.currentSrNo.toString());
      this.directionsService.updateDirection(formData).subscribe(
        () => {
          alert('Direction updated successfully');
          this.resetForm();
          this.fetchDirections();
        },
        (err) => alert('Update failed')
      );
    } else {
      this.directionsService.addDirection(formData).subscribe(
        () => {
          alert('Direction submitted successfully');
          this.resetForm();
          this.fetchDirections();
        },
        (err) => alert('Submission failed')
      );
    }
  }

  onEdit(entry: any): void {
    this.isUpdateMode = true;
    this.currentSrNo = entry.direction_srno;
    this.directionsForm.patchValue({
      authorityId: entry.authority_id,
      projectId: entry.project_id,
      shortNote: entry.directions_short_note,
      directionDate: entry.direction_date.split('T')[0],
      actionDate: entry.action_date.split('T')[0],
      actionDesc: entry.action_desc
    });
  }

  onDelete(srNo: number): void {
    if (!confirm('Are you sure to delete this entry?')) return;
    this.directionsService.deleteDirection({ direction_srno: srNo }).subscribe(
      () => {
        alert('Deleted successfully');
        this.fetchDirections();
      },
      (err) => alert('Delete failed')
    );
  }

  resetForm(): void {
    this.directionsForm.reset({
      authorityId: '',
      projectId: localStorage.getItem('projectId') || '',
      shortNote: '',
      directionDate: '',
      actionDate: '',
      actionDesc: '',
      file: null
    });
    this.selectedFile = null;
    this.isUpdateMode = false;
    this.currentSrNo = null;
       // ✅ Clear file input manually
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onNew(): void {
    this.resetForm();
  }

  getAuthorityName(id: string): string {
    const auth = this.authorities.find(a => a.id === id);
    return auth ? auth.name : 'Unknown';
  }
}
