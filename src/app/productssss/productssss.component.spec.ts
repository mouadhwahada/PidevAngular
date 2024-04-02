import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductssssComponent } from './productssss.component';

describe('ProductssssComponent', () => {
  let component: ProductssssComponent;
  let fixture: ComponentFixture<ProductssssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductssssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductssssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
