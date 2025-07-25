import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent {
  constructor(private router: Router) {}

  goToHomePage(): void {
    this.router.navigate(['/']);
  }
}
