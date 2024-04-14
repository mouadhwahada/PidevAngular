import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from 'src/app/MentalService/answer.service';
import { QuestionService } from 'src/app/MentalService/question.service';
import { Answer } from 'src/app/mentalModels/AnswerModel';
import { Question } from 'src/app/mentalModels/Question';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent {
  answerForm!: FormGroup;
  questions: Question[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private answerService: AnswerService,
    private questionService: QuestionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchQuestions();
  }

  initForm(): void {
    this.answerForm = this.formBuilder.group({
      score: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      textAnswer: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      
    });
  }

  fetchQuestions(): void {
    this.questionService.findAllQuestions().subscribe(
      (questions: Question[]) => {
        this.questions = questions;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  addAnswer(): void {
    if (this.answerForm.valid) {
      const scoreControl = this.answerForm.get('score');
      const textAnswerControl = this.answerForm.get('textAnswer');
  
      if (scoreControl && textAnswerControl && scoreControl.value && textAnswerControl.value) {
        const newAnswer: Answer = {
          idAnswer: 0, // Vous pouvez initialiser l'idAnswer à 0 ou à une valeur par défaut si nécessaire
          score: scoreControl.value,
          textAnswer: textAnswerControl.value
        };
  
        this.answerService.addAnswer(newAnswer).subscribe(
          (response) => {
            console.log('Answer added successfully:', response);
            this.toastr.success('Answer added successfully', 'Succès');
          // Reset the form after successful submission
          this.answerForm.reset();
          },
          (error) => {
            console.error('Error adding answer:', error);
            this.toastr.error('Error adding answer', 'Erreur');
          }
        );
      }
    }
  }
  
  
  
}


