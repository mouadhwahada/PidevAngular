import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsShowComponent } from './order-items-show.component';

describe('OrderItemsShowComponent', () => {
  let component: OrderItemsShowComponent;
  let fixture: ComponentFixture<OrderItemsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemsShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
