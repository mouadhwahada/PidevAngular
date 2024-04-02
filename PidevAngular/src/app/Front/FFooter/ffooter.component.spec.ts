import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FFooterComponent } from './ffooter.component';

describe('FFooterComponent', () => {
  let component: FFooterComponent;
  let fixture: ComponentFixture<FFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
