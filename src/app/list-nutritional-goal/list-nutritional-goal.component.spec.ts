import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNutritionalGoalComponent } from './list-nutritional-goal.component';

describe('ListNutritionalGoalComponent', () => {
  let component: ListNutritionalGoalComponent;
  let fixture: ComponentFixture<ListNutritionalGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNutritionalGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNutritionalGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
