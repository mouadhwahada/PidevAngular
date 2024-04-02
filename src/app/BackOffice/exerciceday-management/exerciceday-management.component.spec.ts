import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicedayManagementComponent } from './exerciceday-management.component';

describe('ExercicedayManagementComponent', () => {
  let component: ExercicedayManagementComponent;
  let fixture: ComponentFixture<ExercicedayManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicedayManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicedayManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
