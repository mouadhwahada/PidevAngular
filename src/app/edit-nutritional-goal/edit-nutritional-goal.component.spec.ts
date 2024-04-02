import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNutritionalGoalComponent } from './edit-nutritional-goal.component';

describe('EditNutritionalGoalComponent', () => {
  let component: EditNutritionalGoalComponent;
  let fixture: ComponentFixture<EditNutritionalGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNutritionalGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNutritionalGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
