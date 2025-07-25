
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectLocationService } from '../services/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-location',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-location.component.html',
  styleUrls: ['./project-location.component.scss'],
  providers: [ProjectLocationService]
})
export class ProjectLocationComponent implements OnInit {
  locationForm!: FormGroup;
  projectId: string = '';
  submitted = false;
 userId: string | null = null;  
 submittedUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private locationService: ProjectLocationService,private router: Router
  ) {}
  

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
    const storedId = localStorage.getItem('projectId');
    if (storedId) {
      this.projectId = storedId;
      console.log('📦 Project ID from localStorage:', this.projectId);
    } else {
      console.warn('⚠️ No Project ID found in localStorage!');
    }

    this.locationForm = this.fb.group({
      projectUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]]
    });
  }

  onSubmit(): void {
    if (this.locationForm.invalid || !this.projectId) {
      console.warn('⚠️ Form invalid or project ID missing');
      return;
    }

    const payload = {
      project_id: Number(this.projectId),
      location_url: this.locationForm.value.projectUrl.trim()
    };

    console.log('📤 Submitting Payload:', payload);

    this.locationService.submitLocation(payload).subscribe({
      next: (res) => {
        console.log('✅ Location Inserted:', res);
        alert('Location successfully submitted!');
         this.submittedUrl = this.locationForm.value.projectUrl.trim(); // 🔑 save the URL
        this.submitted = true;
        // this.locationForm.reset(); // Reset the form after submission
         

      },
      error: (err) => {
        console.error('❌ Submission Failed:', err);
      }
    });
  }
}

