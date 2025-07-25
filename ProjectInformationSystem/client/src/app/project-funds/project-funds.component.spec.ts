import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFundsComponent } from './project-funds.component';

describe('ProjectFundsComponent', () => {
  let component: ProjectFundsComponent;
  let fixture: ComponentFixture<ProjectFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
