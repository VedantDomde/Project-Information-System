import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsComponent} from './project-directions.component';

describe('ProjectDirectionsComponent', () => {
  let component: DirectionsComponent;
  let fixture: ComponentFixture<DirectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});