import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingHomeComponent } from './shopping-home.component';

describe('ShoppingHomeComponent', () => {
  let component: ShoppingHomeComponent;
  let fixture: ComponentFixture<ShoppingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
