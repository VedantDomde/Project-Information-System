import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf,CommonModule } from '@angular/common'; // ✅ Add NgIf too for *ngIf

import {ProjectPhasesService} from '../services/services.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-project-phases',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NgForOf, NgIf],
  templateUrl: './project-phases.component.html',
  styleUrls: ['./project-phases.component.scss']
})
export class ProjectPhasesComponent {
  projectForm: FormGroup;
  documentForm: FormGroup;
  selectedFile: File | null = null;
  submittedData : any[] = [];

  showDocumentSection = false;

   submittedFunds: any[] = []; 
   submittechnical: any[] = []; 
  documentData: any[] = [];
  projectPhasesData:any[] = [];
   userId: string | null = null; 
  selectedPhase: any;
 

  constructor(private fb: FormBuilder,
    private projectphase: ProjectPhasesService,private router: Router) {

    const storedProjectId = localStorage.getItem('projectId');
    const projectId = storedProjectId && !isNaN(+storedProjectId) ? +storedProjectId : null;

    this.projectForm = this.fb.group({
      XTech_ID: ['', Validators.required],
      XPhase_ID: ['', Validators.required],
      XProject_ID: [projectId, Validators.required],
      XPhase_Date: ['', Validators.required],
      XPhase_Type:['', Validators.required],
      XRemark: ['', Validators.required]
    });
    

    this.documentForm = this.fb.group({
      phase_srno: ['', Validators.required],
      document_name: ['', Validators.required],
      files: [null, Validators.required],
    });
  }
   ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.getphases();

     // Listen to dropdown change
  this.projectForm.get('XPhase_ID')?.valueChanges.subscribe(XPhase_ID => {
      console.log('Selected Phase ID:', XPhase_ID);
    this.selectedPhase = this.submittedFunds.find(p => p.phase_id == XPhase_ID);
    console.log('Selected Phase Object:', this.selectedPhase);

    this.projectForm.patchValue({
      XPhase_Type: this.selectedPhase.isAppointment // replace with your desired value
    });

    if (this.selectedPhase.isAppointment == 1) {
      console.log('Selected Phase is 1, fetching technical personnel...');
     this.gettechinal()
     

    }
  });
  }
   gettechinal() {
  
    this.projectphase.getechinicalPersonnel().subscribe({
      next: (res: any) => {
        console.log('✅ Raw data:', res);
        this.submittechnical = res.map(item => ({
          tech_id:item[0],
          Personnel_Name: item[3],                      
          Personnel_Type: item[2],
          Contractor_Type: item[7]
                 
        }));
        console.log('✅ Mapped funds:', this.submittechnical);
      },
      error: (err) => console.error('❌ Get techinal error:', err)
    });
  }
  fetchprojectphases() {
    const projectId = localStorage.getItem('projectId');
    if (!projectId) return;
    this.projectphase.getProjectPhases(+projectId).subscribe(
      (res: any[]) => {
        this.submittedData = res.map((item) => ({
          phase_SrNo: item[23],
          projectId: item[3],
          Remark: item[25],
          phaseId: item[24],
          Date: item[24],
        }));
      },
      (err) => console.error('Fetch error', err)
    );
  }


  getphases() {
    // const project_id = localStorage.getItem('projectId');
    // if (!project_id) return;

    this.projectphase.getProjectPhaseMaster().subscribe({
      next: (res: any) => {
        console.log('✅ Raw data:', res.data);
        this.submittedFunds = res.data.map(item => ({
          
          phase_id: item[0],                      
          phase_description: item[1],
          isAppointment: item[2]
                 
        }));
        console.log('✅ Mapped funds:', this.submittedFunds);
      },
      error: (err) => console.error('❌ Get phases error:', err)
    });
  }

 

  saveProjectPhase() {
    const project_id = localStorage.getItem('projectId');
    if (!project_id) return;

    if (this.projectForm.valid) {
      const formData = { ...this.projectForm.value };
      console.log('Form Data:', formData);
       this.projectPhasesData.push(formData);
      this.projectphase.saveProject(formData).subscribe({
          next: (res: any) => {
            console.log("Project Phase : ",res)
            this.getphases();
            this.showDocumentSection = true;
            console.log('Project Phase saved:', res);
            this.documentForm.patchValue({
              phase_srno: res.id // replace with your desired value
              
            });
            console.log('Document Form Value1:', this.documentForm.value);
            alert('Project Phase saved ✅');
          },
          error: (err) => alert("Project Phase not saved")
        });
    } else {
      alert('Please complete all Project Phase fields.');
    }
  }
  saveDocument() {
  console.log('Selected File:', this.selectedFile);
  console.log('Document Form Value:', this.documentForm.value);

  if (this.documentForm.valid && this.selectedFile) {
    const formData = new FormData();
    formData.append('phase_srno', this.documentForm.value.phase_srno);
    formData.append('document_name', this.documentForm.value.document_name);
    formData.append('files', this.selectedFile);

    // ✅ For backend submission
    this.projectphase.savePhasesdocuments(formData).subscribe({
      next: (res: any) => {
        console.log("Project Phase Document: ", res);
        alert('Project Phase Document saved ✅');

        // ✅ For UI display
        this.documentData.push({
          phase_srno: this.documentForm.value.phase_srno,
          document_name: this.documentForm.value.document_name,
          files: this.selectedFile.name, // Just the file name
        });
        this.documentForm.reset(); // Optional: reset after submit
        this.selectedFile = null;
      },
      error: (err) => console.log("Project Phase Document not saved :", err),
    });
  } else {
    alert('Please complete all Document fields.');
  }
}

  


  // saveDocument() {
  //   console.log('Selected File:', this.selectedFile);
  //   console.log('Document Form Value:', this.documentForm.value); 
  //   if (this.documentForm.valid && this.selectedFile) {
  //     // console.log("document Data 1 :",this.documentForm.value)
  //     // const formData = { ...this.documentForm.value };
       
  //     const formData = new FormData();
  //     formData.append('phase_srno', this.documentForm.value.phase_srno);
  //     formData.append('document_name', this.documentForm.value.document_name);
  //     formData.append('files', this.selectedFile);
  //     console.log('Document Form Data:', formData);          
  //     // formData.fileUpload = formData.fileUpload?.name;
  //     // this.documentData.push(formData);
  //     // console.log("document Data 1 :",this.documentData)
  //     // console.log("document Data 2 :",this.documentData)
  //     this.projectphase.savePhasesdocuments(formData).subscribe({
  //         next: (res: any) => {
  //           console.log("Project Phase Document: ",res)
  //           alert('Project Phase Document saved ✅');
            
  //         },
  //         error: (err) => console.log("Project Phase Document not saved :",err)
  //       });
  //   } else {
  //     alert('Please complete all Document fields. hi');
  //   }
  // }

  onFileChange(event: any) {
    const file = event.target.files[0] || null;
    this.selectedFile = file;
    this.documentForm.patchValue({ files: file }); 
       
  }

  deleteProjectPhase(index: number) {
    if (confirm('Delete this project phase?')) {
      // this.projectphase.splice(index, 1);
    }
  }

  deleteDocument(index: number) {
    if (confirm('Delete this document?')) {
      this.documentData.splice(index, 1);
    }
  }

  openProjectPhasesForm() {
    this.projectForm.reset();
    this.documentForm.reset();
    this.showDocumentSection = false;
    alert('Ready for a new Project Phase + Documents entry ✅');
  }
  openNewForm(): void {
    this.projectForm.reset({
      projectId: this.projectForm.get('projectId')?.value,
       XTech_ID: '',
      XPhase_ID: '',
      XPhase_Date: '',
      XPhase_Type: '',
      XRemark: ''
    });
    // this.isEditing = false;
    // this.editingFundId= null;
  }
}
