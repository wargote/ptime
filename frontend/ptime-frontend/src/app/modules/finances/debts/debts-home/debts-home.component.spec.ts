import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsHomeComponent } from './debts-home.component';

describe('DebtsHomeComponent', () => {
  let component: DebtsHomeComponent;
  let fixture: ComponentFixture<DebtsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebtsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
