import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNutritionTrackingComponent } from './edit-nutrition-tracking.component';

describe('EditNutritionTrackingComponent', () => {
  let component: EditNutritionTrackingComponent;
  let fixture: ComponentFixture<EditNutritionTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNutritionTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNutritionTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
