
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ProjectExpenditureService } from '../services/services.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-project-funds',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './project-expenditure.component.html',
//   styleUrl: './project-expenditure.component.scss'
// })
// export class ProjectExpenditureComponent {
//   projectForm: FormGroup;
//   submittedFunds: any[] = [];
//   isEditing = false;
//   editingFundId: number | null = null;
//   userId: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private fundService: ProjectExpenditureService,
//     private router: Router
//   ) {
//     this.projectForm = this.fb.group({
//       receipt_amount: ['', [Validators.required, Validators.min(1)]],
//       cost_unit: ['', Validators.required],
//       receipt_date: ['', Validators.required]
//     });
//     console.log('✅ Form initialized:', this.projectForm.value);
//     this.getFunds();
//   }

//   ngOnInit(): void {
//     this.userId = localStorage.getItem('userId');
//     console.log('🔐 User ID:', this.userId);
//     if (!this.userId) {
//       console.warn('❌ No userId found. Redirecting to login...');
//       this.router.navigate(['/login']);
//       return;
//     }
//   }

//   getFunds() {
//   const project_id = localStorage.getItem('projectId');
//   console.log('📦 Getting funds for project ID:', project_id);
//   if (!project_id) {
//     console.error('❌ Project ID not found in localStorage.');
//     return;
//   }

//   this.fundService.getFundsByProjectId(+project_id).subscribe({
//     next: (res: any) => {
//       console.log('✅ Raw response:', res);

//       if (!Array.isArray(res.data)) {
//         console.error('❌ Expected res.data to be an array, got:', res.data);
//         return;
//       }

//       this.submittedFunds = res.data.map(item => ({
//         Fund_SrNo: item[23],
//         projectId: item[3],
//         receipt_amount: item[25],
//         cost_unit: item[26],
//         received_date: item[24]
//       }));
//       console.log('✅ Mapped funds:', this.submittedFunds);
//     },
//     error: (err) => console.error('❌ Get funds error:', err)
//   });
// }


//   onSubmit() {
//     console.log('🚀 Submit clicked');

//     if (this.projectForm.invalid) {
//       console.warn('⚠️ Form is invalid');
//       this.projectForm.markAllAsTouched();
//       return;
//     }

//     const project_id = localStorage.getItem('projectId');
//     if (!project_id) {
//       console.error('❌ Project ID not found in localStorage.');
//       alert('❌ Project ID not found in localStorage.');
//       return;
//     }

//     const formData = this.projectForm.value;
//     console.log('📥 Form Data:', formData);

//     const baseAmount = parseFloat(formData.receipt_amount);
//     const unit = parseInt(formData.cost_unit);
//     const finalAmount = baseAmount;

//     if (finalAmount > 9999999999.99) {
//       console.error('❌ Amount exceeds limit.');
//       alert('❌ Amount exceeds limit.');
//       return;
//     }

//     const payload = {
//       Fund_SrNo: this.isEditing ? this.editingFundId : undefined,
//       projectId: +project_id,
//       receipt_amount: finalAmount,
//       cost_unit: unit,
//       receipt_date: formData.receipt_date
//     };

//     console.log('📤 Payload to submit:', payload);

//     const request$ = this.isEditing
//       ? this.fundService.updateFund(payload)
//       : this.fundService.submitProject(payload);

//     request$.subscribe({
//       next: () => {
//         alert(this.isEditing ? '✅ Fund updated!' : '✅ Fund submitted!');
//         console.log('✅ Operation successful');
//         this.getFunds();
//         this.projectForm.reset();
//         this.isEditing = false;
//         this.editingFundId = null;
//       },
//       error: (err) => {
//         console.error('❌ Operation error:', err);
//         alert('❌ Operation failed. See console.');
//       }
//     });
//   }

//   deleteFund(Fund_SrNo: any) {
//     console.log('🗑️ Deleting fund with ID:', Fund_SrNo);
//     if (!confirm('Are you sure you want to delete this fund?')) return;

//     this.fundService.deleteFund(Fund_SrNo).subscribe({
//       next: () => {
//         alert('🗑️ Fund deleted');
//         this.getFunds();
//       },
//       error: (err) => {
//         console.error('❌ Delete error:', err);
//         alert('❌ Could not delete. See console.');
//       }
//     });
//   }

//   editFund(fund: any) {
//     console.log('✏️ Editing fund:', fund);
//     const baseAmount = fund.receipt_amount;
//     this.projectForm.setValue({
//       receipt_amount: baseAmount,
//       cost_unit: fund.cost_unit,
//       receipt_date: fund.received_date
//     });
//     this.isEditing = true;
//     this.editingFundId = fund.Fund_SrNo;
//   }

//   openNewForm(): void {
//     console.log('➕ Opening new form');
//     this.projectForm.reset({
//       projectId: this.projectForm.get('projectId')?.value,
//       receipt_amount: '',
//       cost_unit: '',
//       receipt_date: ''
//     });
//     this.isEditing = false;
//     this.editingFundId = null;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectExpenditureService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-funds',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-expenditure.component.html',
  styleUrl: './project-expenditure.component.scss'
})
export class ProjectExpenditureComponent implements OnInit {
  projectForm: FormGroup;
  submittedFunds: any[] = [];
  isEditing = false;
  editingFundId: number | null = null;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private fundService: ProjectExpenditureService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      receipt_amount: ['', [Validators.required, Validators.min(1)]],
      cost_unit: ['', Validators.required],
      receipt_date: ['', Validators.required]
    });

    console.log('✅ Form initialized:', this.projectForm.value);
    this.getFunds();
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    console.log('🔐 User ID:', this.userId);
    if (!this.userId) {
      console.warn('❌ No userId found. Redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }

    // 👇 Auto-select cost_unit based on receipt_amount
    this.projectForm.get('receipt_amount')?.valueChanges.subscribe(value => {
      const amount = parseFloat(value);
      if (!isNaN(amount)) {
        let unit = 1; // Default to Rupees

        if (amount >= 10000000) {
          unit = 4; // Crore
        } else if (amount >= 100000) {
          unit = 3; // Lakh
        } else if (amount >= 1000) {
          unit = 2; // Thousand
        }

        this.projectForm.get('cost_unit')?.setValue(unit, { emitEvent: false });
      }
    });
  }

  getFunds() {
    const project_id = localStorage.getItem('projectId');
    console.log('📦 Getting funds for project ID:', project_id);
    if (!project_id) {
      console.error('❌ Project ID not found in localStorage.');
      return;
    }

    this.fundService.getFundsByProjectId(+project_id).subscribe({
      next: (res: any) => {
        console.log('✅ Raw response:', res);

        if (!Array.isArray(res.data)) {
          console.error('❌ Expected res.data to be an array, got:', res.data);
          return;
        }

        this.submittedFunds = res.data.map(item => ({
          Fund_SrNo: item[23],
          projectId: item[3],
          receipt_amount: item[25],
          cost_unit: item[26],
          received_date: item[24]
        }));
        console.log('✅ Mapped funds:', this.submittedFunds);
      },
      error: (err) => console.error('❌ Get funds error:', err)
    });
  }

  onSubmit() {
    console.log('🚀 Submit clicked');

    if (this.projectForm.invalid) {
      console.warn('⚠️ Form is invalid');
      this.projectForm.markAllAsTouched();
      return;
    }

    const project_id = localStorage.getItem('projectId');
    if (!project_id) {
      console.error('❌ Project ID not found in localStorage.');
      alert('❌ Project ID not found in localStorage.');
      return;
    }

    const formData = this.projectForm.value;
    console.log('📥 Form Data:', formData);

    const baseAmount = parseFloat(formData.receipt_amount);
    const unit = parseInt(formData.cost_unit);
    const finalAmount = baseAmount;

    if (finalAmount > 9999999999.99) {
      console.error('❌ Amount exceeds limit.');
      alert('❌ Amount exceeds limit.');
      return;
    }

    const payload = {
      Fund_SrNo: this.isEditing ? this.editingFundId : undefined,
      projectId: +project_id,
      receipt_amount: finalAmount,
      cost_unit: unit,
      receipt_date: formData.receipt_date
    };

    console.log('📤 Payload to submit:', payload);

    const request$ = this.isEditing
      ? this.fundService.updateFund(payload)
      : this.fundService.submitProject(payload);

    request$.subscribe({
      next: () => {
        alert(this.isEditing ? '✅ Fund updated!' : '✅ Fund submitted!');
        console.log('✅ Operation successful');
        this.getFunds();
        this.projectForm.reset();
        this.isEditing = false;
        this.editingFundId = null;
      },
      error: (err) => {
        console.error('❌ Operation error:', err);
        alert('❌ Operation failed. See console.');
      }
    });
  }

  deleteFund(Fund_SrNo: any) {
    console.log('🗑️ Deleting fund with ID:', Fund_SrNo);
    if (!confirm('Are you sure you want to delete this fund?')) return;

    this.fundService.deleteFund(Fund_SrNo).subscribe({
      next: () => {
        alert('🗑️ Fund deleted');
        this.getFunds();
      },
      error: (err) => {
        console.error('❌ Delete error:', err);
        alert('❌ Could not delete. See console.');
      }
    });
  }

  editFund(fund: any) {
    console.log('✏️ Editing fund:', fund);
    const baseAmount = fund.receipt_amount;
    this.projectForm.setValue({
      receipt_amount: baseAmount,
      cost_unit: fund.cost_unit,
      receipt_date: fund.received_date
    });
    this.isEditing = true;
    this.editingFundId = fund.Fund_SrNo;
  }

  openNewForm(): void {
    console.log('➕ Opening new form');
    this.projectForm.reset({
      receipt_amount: '',
      cost_unit: '',
      receipt_date: ''
    });
    this.isEditing = false;
    this.editingFundId = null;
  }
}
