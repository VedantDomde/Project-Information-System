
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectPhaseMasterService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase-master',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './phase-master.component.html',
  styleUrls: ['./phase-master.component.scss']
})
export class PhaseMasterComponent {
  projectForm: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectPhaseMasterService: ProjectPhaseMasterService
    
  ) {
    this.projectForm = this.fb.group({
      phasesSequence: [0, [Validators.required, Validators.min(1)]],
      phaseDescription: ['', Validators.required],
      mileStone: [null, Validators.required],
      appointment: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize any data or services if needed
  this.userId = localStorage.getItem('userId');
      if (!this.userId) {
        this.router.navigate(['/login']);
        
      }
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      console.warn('⚠️ Form Invalid:', this.projectForm.errors);
      return;
    }

    const formData = this.projectForm.value;
    console.log('Form Submitted ✅', formData);

    this.projectPhaseMasterService.submitProject(formData).subscribe({
      next: (res) => {
        console.log('✅ Successfully submitted:', res);
        alert('Project Phase Submitted Successfully!');
        this.projectForm.reset(); // Optional: clear form
      },
      error: (err) => {
        console.error('❌ Error submitting phase:', err);
        alert('Failed to submit phase.');
      }
    });
  }
}
