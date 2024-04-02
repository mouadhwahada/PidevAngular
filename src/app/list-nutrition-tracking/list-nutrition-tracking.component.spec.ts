import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNutritionTrackingComponent } from './list-nutrition-tracking.component';

describe('ListNutritionTrackingComponent', () => {
  let component: ListNutritionTrackingComponent;
  let fixture: ComponentFixture<ListNutritionTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNutritionTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNutritionTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
