import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtDialogComponent } from './debt-dialog.component';

describe('DebtDialogComponent', () => {
  let component: DebtDialogComponent;
  let fixture: ComponentFixture<DebtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
