import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymDialogComponent } from './gym-dialog.component';

describe('GymDialogComponent', () => {
  let component: GymDialogComponent;
  let fixture: ComponentFixture<GymDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
