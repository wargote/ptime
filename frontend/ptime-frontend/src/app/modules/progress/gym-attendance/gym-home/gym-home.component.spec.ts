import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymHomeComponent } from './gym-home.component';

describe('GymHomeComponent', () => {
  let component: GymHomeComponent;
  let fixture: ComponentFixture<GymHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
