
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CorrespondenceService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-correspondence',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-correspondence.component.html',
  styleUrls: ['./project-correspondence.component.scss']
})
export class ProjectCorrespondenceComponent implements OnInit {
   @ViewChild('fileInput') fileInput!: ElementRef;
  projectForm: FormGroup;
  selectedFile: File | null = null;
  submittedData: any[] = [];
  userId: string | null = null;
  isUpdateMode = false;
  currentSrNo: number | null = null;
  // currentTransDate: string | null = null;
  


  constructor(
    private fb: FormBuilder,
    private correspondenceService: CorrespondenceService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      Correspondance_Date: ['', Validators.required],
      Subject: ['', Validators.required],
      Desc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.fetchCorrespondence();
  }

  fetchCorrespondence() {
    const projectId = localStorage.getItem('projectId');
    if (!projectId) return;
    this.correspondenceService.getCorrespondence(projectId).subscribe(
      (res: any[]) => {
        this.submittedData = res.map((item) => ({
          Correspondence_SrNo: item[23],
          projectId: item[3],
          Subject: item[25],
          Desc: item[26],
          Correspondance_Date: item[24],
          // Trans_Date: item[29],
          fileName: item[28],
          filePath: item[27]
          // fileName: item[28]?.split('\\').pop()
        }));
      },
      (err) => console.error('Fetch error', err)
    );
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  onSubmit() {
    const projectId = localStorage.getItem('projectId');
    if (!this.projectForm.valid || !projectId || (!this.selectedFile && !this.isUpdateMode)) return;

    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('Correspondance_Date', this.projectForm.value.Correspondance_Date);
    formData.append('Subject', this.projectForm.value.Subject);
    formData.append('Desc', this.projectForm.value.Desc);
    if (this.selectedFile) formData.append('file', this.selectedFile);

    if (this.isUpdateMode && this.currentSrNo) {
      formData.append('Correspondence_SrNo', this.currentSrNo.toString());
  //      if (this.currentTransDate) {
  //   // formData.append('Trans_Date', this.currentTransDate);  // 🔁 append here
  // }
      this.correspondenceService.updateCorrespondence(formData).subscribe(
        (res) => {
          alert('Updated successfully');
          this.resetForm();
          this.fetchCorrespondence();
        },
        (err) => alert('Update failed')
      );
    } else {
      this.correspondenceService.submitCorrespondence(formData).subscribe(
        (res) => {
          alert('Submitted successfully');
          this.resetForm();
          this.fetchCorrespondence();
        },
        (err) => alert('Submission failed')
      );
    }
  }

  onEdit(entry: any) {
    this.isUpdateMode = true;
    // this.currentTransDate = entry.Trans_Date;
    this.currentSrNo = entry.Correspondence_SrNo;
    this.projectForm.patchValue({
      Correspondance_Date: entry.Correspondance_Date.split('T')[0],
      Subject: entry.Subject,
      Desc: entry.Desc
    });
  }

  onDelete(srNo: number) {
    if (!confirm('Are you sure to delete this entry?')) return;
    this.correspondenceService.deleteCorrespondence({ Correspondence_SrNo: srNo }).subscribe(
      () => {
        alert('Deleted successfully');
        this.fetchCorrespondence();
      },
      (err) => alert('Delete failed')
    );
  }

  resetForm() {
    this.projectForm.reset();
    this.selectedFile = null;
    this.isUpdateMode = false;
    this.currentSrNo = null;
    // this.currentTransDate = null;
     if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }

  }

  onNew() {
    this.resetForm();
  }
}
