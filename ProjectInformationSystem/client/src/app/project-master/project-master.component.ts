import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectMasterService } from '../services/services.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-master',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-master.component.html',
  styleUrl: './project-master.component.scss'
})
export class ProjectMasterComponent implements OnInit {
  
  projectForm: FormGroup;
  units: any[] = [];
  tahsils: any[] = [];
  mouzas: any[] = [];
  isLoading = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectMasterService: ProjectMasterService,
    private router: Router,

  ) {
    this.projectForm = this.fb.group({
      // projectId: [0, Validators.required],
      divisionName: ['', Validators.required],
      projectName: ['', Validators.required],
      projectType: [0, Validators.required],
      tahsil: ['', Validators.required],
      mouza: ['', Validators.required],
      khasra: ['', Validators.required],
      landArea: ['', Validators.required],
      landAreaUnit: [0, Validators.required],
      budgetHead: ['', Validators.required],
      projectCost: ['', Validators.required],
      projectCostUnit: [0, Validators.required],
      timeLimit: ['', Validators.required],
      projectDept: ['', Validators.required],
      remark: ['', Validators.required],
      orgId: ['', Validators.required],
      isPublish: [0, Validators.required],
      publishDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      
    }

    this.loadDropdowns();

    // Watch for tahsil changes to load mouzas
    this.projectForm.get('tahsil')?.valueChanges.subscribe((tahsilId) => {
      if (tahsilId) {
        this.loadMouzas(tahsilId);
      } else {
        this.mouzas = [];
        this.projectForm.get('mouza')?.reset();
      }
    });
  }

  loadDropdowns(): void {
    this.isLoading = true;

    // Load units
    this.projectMasterService.getUnits().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // ✅ Correctly maps the API response into an array of { value, text }
          this.units = res.data.map((unit: any) => ({
            value: unit.UNIT_ID,
            text: unit.UNIT_DESC
          }));
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading units:', error);
        this.isLoading = false;
      }
    });

    // Load tahsils
    this.projectMasterService.getTahsils().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // ✅ Correctly maps the API response into an array of { value, text }
          this.tahsils = res.data.map((tahsil: any) => ({
            value: tahsil.TAHSIL_ID,
            text: tahsil.TAHSIL_NAME
          }));
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading units:', error);
        this.isLoading = false;
      }
    });
  }

  loadMouzas(tahsilId: number): void {
    this.isLoading = true;
    this.projectMasterService.getMouzas(tahsilId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // ✅ Correctly maps the API response into an array of { value, text }
          this.mouzas = res.data.map((mouza: any) => ({
            value: mouza.MOUZA_ID,
            text: mouza.MOUZA
          }));
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading units:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
  if (this.projectForm.invalid) {
    this.projectForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  const formData = this.projectForm.value;
  console.log('Form Submitted ✅', formData);

  this.projectMasterService.submitProject(formData).subscribe({
    next: (response) => {
      console.log('Project submitted successfully:', response);
      if (response.projectId) {
        localStorage.setItem('projectId', response.projectId.toString());
      }
      this.isLoading = false;
      alert('Project submitted successfully!');

      // ✅ Clear the form
      this.projectForm.reset();

      // ✅ Optional: Reset specific default values if needed (like dropdowns with `0`)
      this.projectForm.patchValue({
        projectType: 0,
        landAreaUnit: 0,
        projectCostUnit: 0,
        isPublish: 0
      });

      // ✅ Reset dependent dropdowns
      this.mouzas = [];
    },
    error: (err) => {
      console.error('Error submitting project:', err);
      this.isLoading = false;
    }
  });
}

}
