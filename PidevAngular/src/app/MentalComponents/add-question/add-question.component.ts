import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/MentalService/question.service';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Question } from 'src/app/mentalModels/Question';
import { Quiz } from 'src/app/mentalModels/QuizModel';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  questionForm!: FormGroup;
  quizzes: Quiz[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchQuizzes();
  }

  initForm(): void {
    this.questionForm = this.formBuilder.group({
      charQ: ['', Validators.required],
      textQ: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      selectedQuiz: ['', Validators.required] 
    });
  }

  fetchQuizzes(): void {
    this.quizService.findAllQuizzes().subscribe(
      (quizzes: Quiz[]) => {
        this.quizzes = quizzes;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  addQuestion(): void {
    if (this.questionForm.valid) {
      console.log('Form is valid:', this.questionForm.value);
      const { charQ, textQ, selectedQuiz } = this.questionForm.value;
      const question: Question = { idQuestion: -1, charQ, textQ, quiz: selectedQuiz || null, answerList: [] }; // Ensure selectedQuiz is not undefined
      this.questionService.addQuestionToQuiz(selectedQuiz.idQuiz, question).subscribe(
        (response) => {
          console.log('Question added successfully:', response);
          this.questionForm.reset();
          alert('Question added successfully!');
        },
        (error) => {
          console.error('Error adding question:', error);
          alert('Failed to add question: ' + error.message);
        }
      );
    } else {
      console.log('Form is invalid:', this.questionForm);
      alert('Please fill all required fields correctly and select a quiz!');
    }
  }


  questionEndingWithQuestionMark(): ValidatorFn {
    return (control) => {
      const textQ = control.value;
      if (textQ && !textQ.endsWith('?')) {
        return { 'questionNotEndingWithQuestionMark': true };
      }
      return null;
    };
  }
}


