import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPerspectiveComponent } from './project-perspective.component';

describe('ProjectPerspectiveComponent', () => {
  let component: ProjectPerspectiveComponent;
  let fixture: ComponentFixture<ProjectPerspectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPerspectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPerspectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
