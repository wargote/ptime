import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksHomeComponent } from './tasks-home.component';

describe('TasksHomeComponent', () => {
  let component: TasksHomeComponent;
  let fixture: ComponentFixture<TasksHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
