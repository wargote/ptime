import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderTableComponent } from './reminder-table.component';

describe('ReminderTableComponent', () => {
  let component: ReminderTableComponent;
  let fixture: ComponentFixture<ReminderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReminderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
