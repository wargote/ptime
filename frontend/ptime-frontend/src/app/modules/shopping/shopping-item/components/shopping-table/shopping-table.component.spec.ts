import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTableComponent } from './shopping-table.component';

describe('ItemTableComponent', () => {
  let component: ItemTableComponent;
  let fixture: ComponentFixture<ItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
