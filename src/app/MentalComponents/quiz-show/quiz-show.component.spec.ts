import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizShowComponent } from './quiz-show.component';

describe('QuizShowComponent', () => {
  let component: QuizShowComponent;
  let fixture: ComponentFixture<QuizShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
