import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilMentalComponent } from './acceuil-mental.component';

describe('AcceuilMentalComponent', () => {
  let component: AcceuilMentalComponent;
  let fixture: ComponentFixture<AcceuilMentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilMentalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilMentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
