import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/MentalService/question.service';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Question } from 'src/app/mentalModels/Question';
import { Quiz } from 'src/app/mentalModels/QuizModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  questionForm!: FormGroup;
  quizzes: Quiz[] = [];
  idQuestion!: number;
  idAnswer!: number;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private quizService: QuizService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchQuizzes();
  }

  initForm(): void {
    this.questionForm = this.formBuilder.group({
      charQ: ['', Validators.required],
      textQ: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      
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
      const question: Question = {
        idQuestion: -1, 
        charQ: this.questionForm.value.charQ,
        textQ: this.questionForm.value.textQ,
        answerList: [] // Initialiser à null si la liste des réponses est vide lors de l'ajout initial
      };

      this.questionService.addQuestion(question).subscribe(
        (data: Question) => {
          console.log('Question added successfully:', data);
          this.toastr.success('Question added successfully', 'Succès');
          // Reset the form after successful submission
          this.questionForm.reset();
        },
        (error) => {
          console.error('Error adding question:', error);
          this.toastr.error('Error adding question', 'Erreur');
        }
      );
    }
  }
  addAnswer(): void {
    this.questionService.addAnswerToQuestion(this.idQuestion, this.idAnswer).subscribe(() => {
      console.log('Answer added successfully');
    }, error => {
      console.error('Failed to add answer:', error);
    });
  }

  removeAnswer(): void {
    this.questionService.removeAnswerFromQuestion(this.idQuestion, this.idAnswer).subscribe(() => {
      console.log('Answer removed successfully');
    }, error => {
      console.error('Failed to remove answer:', error);
    });
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


