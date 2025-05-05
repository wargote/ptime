import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightHomeComponent } from './weight-home.component';

describe('WeightHomeComponent', () => {
  let component: WeightHomeComponent;
  let fixture: ComponentFixture<WeightHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeightHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
