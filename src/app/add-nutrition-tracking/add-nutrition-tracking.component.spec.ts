import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionTrackComponent } from './add-nutrition-tracking.component';

describe('AddNutritionTrackingComponent', () => {
  let component: NutritionTrackComponent;
  let fixture: ComponentFixture<NutritionTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
