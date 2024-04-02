import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orderitem22Component } from './orderitem22.component';

describe('Orderitem22Component', () => {
  let component: Orderitem22Component;
  let fixture: ComponentFixture<Orderitem22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Orderitem22Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orderitem22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
