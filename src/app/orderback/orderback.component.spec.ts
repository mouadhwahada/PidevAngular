import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbackComponent } from './orderback.component';

describe('OrderbackComponent', () => {
  let component: OrderbackComponent;
  let fixture: ComponentFixture<OrderbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
