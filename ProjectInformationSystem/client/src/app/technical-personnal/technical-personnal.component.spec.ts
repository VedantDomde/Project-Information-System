import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalPersonnalComponent} from './technical-personnal.component';

describe('TechnicalPersonnalComponent', () => {
  let component: TechnicalPersonnalComponent;
  let fixture: ComponentFixture<TechnicalPersonnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalPersonnalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalPersonnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
