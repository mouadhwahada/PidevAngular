import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkout22Component } from './checkout22.component';

describe('Checkout22Component', () => {
  let component: Checkout22Component;
  let fixture: ComponentFixture<Checkout22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Checkout22Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Checkout22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
