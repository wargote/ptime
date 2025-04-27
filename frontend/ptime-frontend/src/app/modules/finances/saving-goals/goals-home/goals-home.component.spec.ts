import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsHomeComponent } from './goals-home.component';

describe('GoalsHomeComponent', () => {
  let component: GoalsHomeComponent;
  let fixture: ComponentFixture<GoalsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
