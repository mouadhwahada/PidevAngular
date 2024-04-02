import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNutritionalGoalComponent } from './add-nutritional-goal.component';

describe('AddNutritionalGoalComponent', () => {
  let component: AddNutritionalGoalComponent;
  let fixture: ComponentFixture<AddNutritionalGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNutritionalGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNutritionalGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
