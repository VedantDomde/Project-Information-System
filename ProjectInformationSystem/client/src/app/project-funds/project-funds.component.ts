
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ProjectFundsService } from '../services/services.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-project-funds',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './project-funds.component.html',
//   styleUrl: './project-funds.component.scss'
// })
// export class ProjectFundsComponent { 
//   projectForm: FormGroup; // FormGroup to manage form state
//   submittedFunds: any[] = [];   // Array to hold submitted funds
//   isEditing = false; // Flag to indicate if we are editing an existing fund
//   editingFundId: number | null = null; // ID of the fund being edited 
//     userId: string | null = null;       

//   constructor(private fb: FormBuilder, private fundService: ProjectFundsService,private router: Router) {
//     this.projectForm = this.fb.group({
//       amount: ['', [Validators.required, Validators.min(1)]],
//       amountUnit: ['', Validators.required],
//       fundReceivedDate: ['', Validators.required]
//     });
//     this.getFunds();
//   }
//    ngOnInit(): void {
//     this.userId = localStorage.getItem('userId');
//     if (!this.userId) {
//       this.router.navigate(['/login']);
//       return;
//     }
//   }
  

//   getFunds() {
//     const project_id = localStorage.getItem('projectId');
//     if (!project_id) return;

//     this.fundService.getFundsByProjectId(+project_id).subscribe({
//         next: (res: any[]) => {
//         console.log('✅ Raw data:', res);
//         this.submittedFunds = res.map(item => ({
//           fund_id: item[23],                      
//           project_id: item[3],
//           receipt_amount: item[25],
//           cost_unit: item[26],
//           fund_received_date: item[24]             
//         }));
//         console.log('✅ Mapped funds:', this.submittedFunds);
//       },
//       error: (err) => console.error('❌ Get funds error:', err)
//     });
//   }

//   onSubmit() {
//     if (this.projectForm.invalid) {
//       this.projectForm.markAllAsTouched();
//       return;
//     }

//     const project_id = localStorage.getItem('projectId');
//     if (!project_id) {
//       alert('❌ Project ID not found in localStorage.');
//       return;
//     }
//     console.log('✅ Project ID:', project_id);

//     const formData = this.projectForm.value;
//     const baseAmount = parseFloat(formData.amount);
//     const unit = parseInt(formData.amountUnit);
//     const finalAmount = baseAmount;

//     if (finalAmount > 9999999999.99) {
//       alert('❌ Amount exceeds limit.');
//       return;
//     }

//     const payload = {
//       fund_id: this.isEditing ? this.editingFundId : undefined,
//       project_id: +project_id,
//       receipt_amount: finalAmount,
//       cost_unit: unit,
//       receipt_date: formData.fundReceivedDate
//     };
//     console.log('✅ Payload:', payload);

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

//   deleteFund(fund_id: any) {
//     if (!confirm('Are you sure you want to delete this fund?')) return;
//     this.fundService.deleteFund(fund_id).subscribe({
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
//     // const baseAmount = fund.receipt_amount / fund.cost_unit;
//      const baseAmount = fund.receipt_amount;
//     this.projectForm.setValue({
//       amount: baseAmount,
//       amountUnit: fund.cost_unit,
//       fundReceivedDate: fund.fund_received_date
//     });
//     this.isEditing = true;            // set editing mode indicator
//     // set the ID of the fund being edited      
//     this.editingFundId = fund.fund_id; 
//   }
//    openNewForm(): void {
//     this.projectForm.reset({
//       projectId: this.projectForm.get('projectId')?.value,
//       amount: '',
//       amountUnit: '',
//     });
//     this.isEditing = false;
//     this.editingFundId= null;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectFundsService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-funds',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-funds.component.html',
  styleUrl: './project-funds.component.scss'
})
export class ProjectFundsComponent implements OnInit {
  projectForm: FormGroup;
  submittedFunds: any[] = [];
  isEditing = false;
  editingFundId: number | null = null;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private fundService: ProjectFundsService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      amountUnit: ['', Validators.required],
      fundReceivedDate: ['', Validators.required]
    });

    this.getFunds();
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    // 👇 Auto-select amountUnit based on amount
    this.projectForm.get('amount')?.valueChanges.subscribe(value => {
      const amount = parseFloat(value);
      if (!isNaN(amount)) {
        let unit = 1; // Default: Rupees

        if (amount >= 10000000) {
          unit = 4; // Crore
        } else if (amount >= 100000) {
          unit = 3; // Lakh
        } else if (amount >= 1000) {
          unit = 2; // Thousand
        }

        this.projectForm.get('amountUnit')?.setValue(unit, { emitEvent: false });
      }
    });
  }

  getFunds() {
    const project_id = localStorage.getItem('projectId');
    if (!project_id) return;

    this.fundService.getFundsByProjectId(+project_id).subscribe({
      next: (res: any[]) => {
        console.log('✅ Raw data:', res);
        this.submittedFunds = res.map(item => ({
          fund_id: item[23],
          project_id: item[3],
          receipt_amount: item[25],
          cost_unit: item[26],
          fund_received_date: item[24]
        }));
        console.log('✅ Mapped funds:', this.submittedFunds);
      },
      error: (err) => console.error('❌ Get funds error:', err)
    });
  }
   
  onSubmit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const project_id = localStorage.getItem('projectId');
    if (!project_id) {
      alert('❌ Project ID not found in localStorage.');
      return;
    }

    const formData = this.projectForm.value;
    const baseAmount = parseFloat(formData.amount);
    const unit = parseInt(formData.amountUnit);
    const finalAmount = baseAmount;

    if (finalAmount > 9999999999.99) {
      alert('❌ Amount exceeds limit.');
      return;
    }

    const payload = {
      fund_id: this.isEditing ? this.editingFundId : undefined,
      project_id: +project_id,
      receipt_amount: finalAmount,
      cost_unit: unit,
      receipt_date: formData.fundReceivedDate
    };

    const request$ = this.isEditing
      ? this.fundService.updateFund(payload)
      : this.fundService.submitProject(payload);

    request$.subscribe({
      next: () => {
        alert(this.isEditing ? '✅ Fund updated!' : '✅ Fund submitted!');
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

  deleteFund(fund_id: any) {
    if (!confirm('Are you sure you want to delete this fund?')) return;
    this.fundService.deleteFund(fund_id).subscribe({
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
    const baseAmount = fund.receipt_amount;
    this.projectForm.setValue({
      amount: baseAmount,
      amountUnit: fund.cost_unit,
      fundReceivedDate: fund.fund_received_date
    });
    this.isEditing = true;
    this.editingFundId = fund.fund_id;
  }

  openNewForm(): void {
    this.projectForm.reset({
      amount: '',
      amountUnit: '',
      fundReceivedDate: ''
    });
    this.isEditing = false;
    this.editingFundId = null;
  }
}

