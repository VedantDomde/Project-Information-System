import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicalPersonnalService } from '../services/services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-technical-personnal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './technical-personnal.component.html',
  styleUrl: './technical-personnal.component.scss'
})
export class TechnicalPersonnalComponent {
  projectForm: FormGroup;
   userId: string | null = null;  

  constructor(
    private fb: FormBuilder,
    private projectTechnicalPersonnalService: TechnicalPersonnalService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      // personnelId: ['', Validators.required],
      personnelType: [0, Validators.required],
      personnelName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      licenseNumber: ['', Validators.required],
      contractorType: [0, Validators.required],
      contractorClass: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }}

  onSubmit() {
    const formData = this.projectForm.value;
    console.log('Form Submitted ✅', formData);

    this.projectTechnicalPersonnalService.addTechnicalPersonnal(formData).subscribe({
      next: (response: any) => {
        alert("form submitted successfully");
        console.log('Project submitted successfully:', response);
      },
      error: (err: any) => {
        console.error('Error submitting project:', err);
      }
    });
  }
}
