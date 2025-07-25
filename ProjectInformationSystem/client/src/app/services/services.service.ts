import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// login service

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api'; // Your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log('📦 Sending POST to /login:', body);
    return this.http.post(`${this.baseUrl}/login`, body);
  }
}
// ProjectMasterService
@Injectable({
  providedIn: 'root'
})
export class ProjectMasterService {
  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) {}
  getUnits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/unit/units`);
  }

   // Get tahsils dropdown
  getTahsils(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tahsils/all`);
  }

  // Get mouzas based on tahsil
  getMouzas(tahsilId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/mouza/mouzas/${tahsilId}`);
  }
 
   // Get mouzas based on tahsil
  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallproject`);
  }

  submitProject(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projectsadd`, data);
  }
} 
// Perspective
@Injectable({ providedIn: 'root' })
export class Perspective {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProjectPerspectives(projectId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/project-perspectivegetall/${projectId}`);
  }

  submitProject(formData: FormData) {
    return this.http.post(`${this.baseUrl}/project-perspectiveadd`, formData);
  }

  updateProject(formData: FormData) {
    return this.http.put(`${this.baseUrl}/perspectiveUpdate`, formData);
  }

  deleteProject(Project_SrNo: number) {
    return this.http.request('delete', `${this.baseUrl}/perspectivedelete`, {
      body: { Project_SrNo }
    });
  }
}

// ProjectPhasesService

@Injectable({ 
  providedIn: 'root'
})
export class ProjectPhasesService {
  private apiUrl = 'http://localhost:5000/api';
 
  constructor(private http: HttpClient) {}

  saveProject(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/project-phases_dadd`, data);
  }   
  getProjectPhases(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/project-phasesget/${projectId}`);
  }
  getProjectPhaseMaster(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/project-phases_m_getall`);
  }
  getechinicalPersonnel(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/technical-personnelgetall`);
  }
  
   savePhasesdocuments(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/phases-documentsadd`, formData);
   }   
} 
// ProjectFundsService  
@Injectable({
  providedIn: 'root'
})
export class ProjectFundsService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // 🔸 Insert Fund
  submitProject(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/project-fundadd`, payload);
  }

  // 🔸 Get Funds by Project ID
  getFundsByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/project-fundget/${projectId}`);
  }

  // 🔸 Update Fund
  updateFund(payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/project-fundupdate`, payload);
  }
  deleteFund(fund_id: number): Observable<any> {
  console.log('🗑️ Deleting extension with ID:', fund_id);
  return this.http.delete(`${this.apiUrl}/project-funddelete`, {
    body: { fund_id }, // ✅ sending body
    headers: { 'Content-Type': 'application/json' } // optional but good
  });
}

}



@Injectable({
  providedIn: 'root'
})
export class CorrespondenceService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  submitCorrespondence(formData: FormData) {
    return this.http.post(`${this.baseUrl}/addcorrespondence`, formData);
  }

  getCorrespondence(projectId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/getprojectcorrespondence/${projectId}`);
  }

  updateCorrespondence(formData: FormData) {
    return this.http.put(`${this.baseUrl}/correspondenceupdate`, formData);
  }

  deleteCorrespondence(data: { Correspondence_SrNo: number }) {
    return this.http.request('delete', `${this.baseUrl}/correspondencedelete`, {
      body: data
    });
  }
}

// ProjectCorrespondenceService

// @Injectable({
//   providedIn: 'root'
// })
// export class CorrespondenceService {
//   private baseUrl = 'http://localhost:5000/api';

//   constructor(private http: HttpClient) {}

//   submitCorrespondence(formData: FormData): Observable<any> {
//     return this.http.post(`${this.baseUrl}/addcorrespondence`, formData);
//   }

//   getCorrespondenceByProject(projectId: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/getprojectcorrespondence/${projectId}`);
//   }
// }

// // ProjectDirectionsService

// export interface Authority {
//   id: string;
//   name: string;
// }

// @Injectable({ providedIn: 'root' })
// export class DirectionsService {
//   private baseUrl = 'http://localhost:5000/api'; // Change to your actual base URL

//   constructor(private http: HttpClient) {}

//   getAuthorities(): Observable<Authority[]> {
//     console.log('📥 Fetching authority list...');
//     return this.http.get<Authority[]>(`${this.baseUrl}/authorities`);
//   }

//   addDirection(formData: FormData): Observable<any> {
//     console.log('📤 Submitting direction:', formData);
//     return this.http.post(`${this.baseUrl}/adddirection`, formData);
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class DirectionsService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getAuthorities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAuthorities`);
  }

  // getDirections(projectId): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/directions`,projectId);
  // }
  getDirections(project_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/directions/${project_id}`);
  }

  addDirection(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/directionsadd`, formData);
  }

  updateDirection(formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/directionsupdate`, formData);
  }

  deleteDirection(body: { direction_srno: number }): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/directionsdelete`, {
      body,
    });
  }
}
// ProjectExpenditureService

@Injectable({
  providedIn: 'root'
})
export class ProjectExpenditureService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // 🔸 Insert Fund
  submitProject(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projectExpenditureadd`, payload);
  }

  // 🔸 Get Funds by Project ID
  getFundsByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getexpenditure/${projectId}`);
  }

  // 🔸 Update Fund
  updateFund(payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/project-expenditureupdate`, payload);
  } 
  
  deleteFund(Fund_SrNo: number): Observable<any> {
  console.log('🗑️ Deleting extension with ID:', Fund_SrNo);
  return this.http.delete(`${this.apiUrl}/project-expendituredelete`, {
    body: { Fund_SrNo }, // ✅ sending body
    headers: { 'Content-Type': 'application/json' } // optional but good
  });
}

}

// // ProjectTimeLimitExtensionService
// @Injectable({ providedIn: 'root' })
// export class ProjectTimeLimitExtensionService {
//   private baseUrl = 'http://localhost:5000/api';

//   constructor(private http: HttpClient) {}

//   submitExtension(formData: FormData) {
//     return this.http.post(`${this.baseUrl}/extensionsadd`, formData);
//   }

//   getAllExtensions(projectId: number) {
//     return this.http.get(`${this.baseUrl}/extensionsall/${projectId}`);
//   }
// }
// extenstion
@Injectable({ providedIn: 'root' })
export class ProjectTimeLimitExtensionService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  submitExtension(formData: FormData) {
    return this.http.post(`${this.baseUrl}/extensionsadd`, formData);
  }

  updateExtension(formData: FormData) {
    return this.http.put(`${this.baseUrl}/project-extensionupdate`, formData);
  }

  deleteExtension(body: { extension_SrNo: number }) {
    return this.http.delete(`${this.baseUrl}/project-extensiondelete`, { body });
  }

  getExtensionsByProjectId(projectId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/extensionsall/${projectId}`);
  }
}

// ProjectPhaseMasterService

@Injectable({
  providedIn: 'root'
})
export class ProjectPhaseMasterService {
  private apiUrl = 'http://localhost:5000/api/project-phasesadd_m'; // Change to match your backend base URL

  constructor(private http: HttpClient) {}

  submitProject(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}




// TechnicalPersonnelService
@Injectable({
  providedIn: 'root'
})
export class TechnicalPersonnalService {
  private apiUrl = 'http://localhost:5000/api/technical-personneladd';  // Change if using a different port

  constructor(private http: HttpClient) {}

  addTechnicalPersonnal(data: any): Observable<any> {
    return this.http.post(this.apiUrl ,data);
  }
}
// ProjectLocationService

@Injectable({
  providedIn: 'root'
})
export class ProjectLocationService {
  private apiUrl = 'http://localhost:5000/api/google-locationadd'; // 🔁 Change port if needed

  constructor(private http: HttpClient) {}

  submitLocation(data: { project_id: number; location_url: string }): Observable<any> {
    console.log('🌐 Sending POST to backend:', this.apiUrl, 'with data:', data);
    return this.http.post(this.apiUrl, data);
  }
}
// ProjectProgressService
@Injectable({
  providedIn: 'root'
})

export class ProjectProgressService {
  private apiUrl = 'http://localhost:5000/api/project-completionadd';

  constructor(private http: HttpClient) {}

  submitProgress(data: { projectId: number, Percentage: number }): Observable<any> {
    console.log('🌐 POSTing progress data to:', this.apiUrl, 'Data:', data);
    return this.http.post(this.apiUrl, data);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:5000/api'; // Adjust if base URL is different

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getallproject`);
  }
}

