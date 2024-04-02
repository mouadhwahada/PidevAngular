import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkoutComponent } from './update-workout.component';

describe('UpdateWorkoutComponent', () => {
  let component: UpdateWorkoutComponent;
  let fixture: ComponentFixture<UpdateWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWorkoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
