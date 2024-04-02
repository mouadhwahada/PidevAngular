import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizClientComponent } from './quiz-client.component';

describe('QuizClientComponent', () => {
  let component: QuizClientComponent;
  let fixture: ComponentFixture<QuizClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
