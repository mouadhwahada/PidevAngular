import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNotifyComponent } from './quiz-notify.component';

describe('QuizNotifyComponent', () => {
  let component: QuizNotifyComponent;
  let fixture: ComponentFixture<QuizNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizNotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
