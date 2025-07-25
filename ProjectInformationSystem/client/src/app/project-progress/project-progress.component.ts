
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectProgressService } from '../services/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-progress',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.scss'],
  providers: [ProjectProgressService]
})
export class ProjectProgressComponent implements OnInit {
  progressForm!: FormGroup;
  projectId: string = '';
  savedPercentage: number | null = null;
  savedProjectId: string = '';
  userId: string | null = null;  

  constructor(private fb: FormBuilder, private progressService: ProjectProgressService,private router: Router) {}

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
      console.warn('⚠️ No project_id found in localStorage!');
    }

    this.progressForm = this.fb.group({
      Percentage: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  submitProgress(): void {
    if (this.progressForm.invalid || !this.projectId) {
      console.warn('⚠️ Invalid form or missing projectId');
      return;
    }

    const payload = {
      projectId: Number(this.projectId),
      Percentage: this.progressForm.value.Percentage
    };

    console.log('📤 Submitting to backend:', payload);

    this.progressService.submitProgress(payload).subscribe({
      next: (res) => {
        console.log('✅ Backend response:', res);
        alert('Progress submitted successfully!');
        this.savedPercentage = payload.Percentage;
        this.savedProjectId = this.projectId;
        this.progressForm.reset();
      },
      error: (err) => {
        console.error('❌ Error submitting progress:', err);
      }
    });
  }

  getColor(percent: number): string {
    if (percent < 40) return '#ffc107';
    if (percent < 70) return '#007bff';
    return '#28a745';
  }
}
