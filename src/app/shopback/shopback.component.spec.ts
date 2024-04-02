import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopbackComponent } from './shopback.component';

describe('ShopbackComponent', () => {
  let component: ShopbackComponent;
  let fixture: ComponentFixture<ShopbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
