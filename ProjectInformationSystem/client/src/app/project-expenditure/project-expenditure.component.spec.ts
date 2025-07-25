import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectExpenditureComponent } from './project-expenditure.component';

describe('ProjectExpenditureComponent', () => {
  let component: ProjectExpenditureComponent;
  let fixture: ComponentFixture<ProjectExpenditureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectExpenditureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
