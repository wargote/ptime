import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymTableComponent } from './gym-table.component';

describe('GymTableComponent', () => {
  let component: GymTableComponent;
  let fixture: ComponentFixture<GymTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
