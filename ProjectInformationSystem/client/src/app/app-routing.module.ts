import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
       {
      path: '',
      loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
     },
      {
        path: 'project-search',
        loadComponent: () => import('./project-search/project-search.component').then((c) => c.ProjectSearchComponent)
      },
      {
        path: 'project-master',
        loadComponent: () => import('./project-master/project-master.component').then((c) => c.ProjectMasterComponent)
      },
      {
        path: 'project-phases',
        loadComponent: () => import('./project-phases/project-phases.component').then((c) => c.ProjectPhasesComponent)
      },
      {
        path: 'project-perspective',
        loadComponent: () => import('./project-perspective/project-perspective.component').then((c) => c.ProjectPerspectiveComponent)
      },
      {
        path: 'project-funds',
        loadComponent: () => import('./project-funds/project-funds.component').then((c) => c.ProjectFundsComponent)
      },
      {
        path: 'project-location',
        loadComponent: () => import('./project-location/project-location.component').then((c) => c.ProjectLocationComponent)
      },
      {
        path: 'project-correspondence',
        loadComponent: () => import('./project-correspondence/project-correspondence.component').then((c) => c.ProjectCorrespondenceComponent)
      },
      {
        path: 'project-directions',
        loadComponent: () => import('./project-directions/project-directions.component').then((c) => c.DirectionsComponent)
      },
      {
        path: 'project-expenditure',
        loadComponent: () => import('./project-expenditure/project-expenditure.component').then((c) => c.ProjectExpenditureComponent)
      },
      {
        path: 'time-limit-extension',
        loadComponent: () => import('./time-limit-extension/time-limit-extension.component').then((c) => c.TimeLimitExtensionComponent)
      },
      {
        path: 'project-progress',
        loadComponent: () => import('./project-progress/project-progress.component').then((c) => c.ProjectProgressComponent)
      },
      {
        path: 'phase-master',
        loadComponent: () => import('./phase-master/phase-master.component').then((c) => c.PhaseMasterComponent)
      },
      {
        path: 'technical-personnal',
        loadComponent: () => import('./technical-personnal/technical-personnal.component').then((c) => c.TechnicalPersonnalComponent)
      }

    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
      },
      // {
      //   path: 'register',
      //   loadComponent: () =>
      //     import('./demo/pages/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent)
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
// import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path: '',
//     component: AdminComponent,
//     children: [
//       {
//         path: 'project-search',
//         loadComponent: () => import('./project-search/project-search.component').then((c) => c.ProjectSearchComponent)
//       },
//       {
//         path: 'project-master',
//         loadComponent: () => import('./project-master/project-master.component').then((c) => c.ProjectMasterComponent)
//       },
//       {
//         path: 'project-phases',
//         loadComponent: () => import('./project-phases/project-phases.component').then((c) => c.ProjectPhasesComponent)
//       },
//       {
//         path: 'project-perspective',
//         loadComponent: () => import('./project-perspective/project-perspective.component').then((c) => c.ProjectPerspectiveComponent)
//       },
//       {
//         path: 'project-funds',
//         loadComponent: () => import('./project-funds/project-funds.component').then((c) => c.ProjectFundsComponent)
//       },
//       {
//         path: 'project-location',
//         loadComponent: () => import('./project-location/project-location.component').then((c) => c.ProjectLocationComponent)
//       },
//       {
//         path: 'project-correspondence',
//         loadComponent: () => import('./project-correspondence/project-correspondence.component').then((c) => c.ProjectCorrespondenceComponent)
//       },
//       {
//         path: 'project-directions',
//         loadComponent: () => import('./project-directions/project-directions.component').then((c) => c.DirectionsComponent)
//       },
//       {
//         path: 'project-expenditure',
//         loadComponent: () => import('./project-expenditure/project-expenditure.component').then((c) => c.ProjectExpenditureComponent)
//       },
//       {
//         path: 'time-limit-extension',
//         loadComponent: () => import('./time-limit-extension/time-limit-extension.component').then((c) => c.TimeLimitExtensionComponent)
//       },
//       {
//         path: 'project-progress',
//         loadComponent: () => import('./project-progress/project-progress.component').then((c) => c.ProjectProgressComponent)
//       },
//       {
//         path: 'phase-master',
//         loadComponent: () => import('./phase-master/phase-master.component').then((c) => c.PhaseMasterComponent)
//       },
//       {
//         path: 'technical-personnal',
//         loadComponent: () => import('./technical-personnal/technical-personnal.component').then((c) => c.TechnicalPersonnalComponent)
//       }
//     ]
//   },
//   {
//     path: '',
//     component: GuestLayoutComponent,
//     children: [
//       {
//         path: 'login',
//         loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
//       }
//     ]
//   },
//   {
//     path: '**',
//     redirectTo: 'login'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
