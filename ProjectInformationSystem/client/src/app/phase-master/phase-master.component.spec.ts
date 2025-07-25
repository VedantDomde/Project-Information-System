import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseMasterComponent } from './phase-master.component';

describe('PhaseMasterComponent', () => {
  let component: PhaseMasterComponent;
  let fixture: ComponentFixture<PhaseMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
