import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesHomeComponent } from './incomes-home.component';

describe('IncomesHomeComponent', () => {
  let component: IncomesHomeComponent;
  let fixture: ComponentFixture<IncomesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomesHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
