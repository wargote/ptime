import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifHomeComponent } from './notif-home.component';

describe('NotifHomeComponent', () => {
  let component: NotifHomeComponent;
  let fixture: ComponentFixture<NotifHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
