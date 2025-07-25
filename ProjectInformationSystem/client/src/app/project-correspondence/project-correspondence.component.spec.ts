import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCorrespondenceComponent } from './project-correspondence.component';

describe('ProjectCorrespondenceComponent', () => {
  let component: ProjectCorrespondenceComponent;
  let fixture: ComponentFixture<ProjectCorrespondenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCorrespondenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCorrespondenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
