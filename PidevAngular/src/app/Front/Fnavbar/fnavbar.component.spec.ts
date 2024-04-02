import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FNavbarComponent } from './fnavbar.component';

describe('FNavbarComponent', () => {
  let component: FNavbarComponent;
  let fixture: ComponentFixture<FNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
