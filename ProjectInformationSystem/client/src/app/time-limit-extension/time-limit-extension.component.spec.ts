import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLimitExtensionComponent } from './time-limit-extension.component';

describe('TimeLimitExtensionComponent', () => {
  let component: TimeLimitExtensionComponent;
  let fixture: ComponentFixture<TimeLimitExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeLimitExtensionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLimitExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
