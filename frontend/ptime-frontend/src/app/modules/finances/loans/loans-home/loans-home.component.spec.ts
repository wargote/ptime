import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansHomeComponent } from './loans-home.component';

describe('LoansHomeComponent', () => {
  let component: LoansHomeComponent;
  let fixture: ComponentFixture<LoansHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
