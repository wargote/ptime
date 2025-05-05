import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightTableComponent } from './weight-table.component';

describe('WeightTableComponent', () => {
  let component: WeightTableComponent;
  let fixture: ComponentFixture<WeightTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
