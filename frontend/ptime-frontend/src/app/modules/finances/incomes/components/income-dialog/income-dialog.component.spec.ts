import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDialogComponent } from './income-dialog.component';

describe('IncomeDialogComponent', () => {
  let component: IncomeDialogComponent;
  let fixture: ComponentFixture<IncomeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
