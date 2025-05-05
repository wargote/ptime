import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersHomeComponent } from './reminders-home.component';

describe('RemindersHomeComponent', () => {
  let component: RemindersHomeComponent;
  let fixture: ComponentFixture<RemindersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemindersHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemindersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
