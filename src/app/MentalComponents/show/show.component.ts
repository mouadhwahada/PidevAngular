import { Component } from '@angular/core';
import { QuestionService } from 'src/app/MentalService/question.service';
import { Answer } from 'src/app/mentalModels/AnswerModel';
import { Question } from 'src/app/mentalModels/Question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Quiz } from 'src/app/mentalModels/QuizModel';
import { AnswerService } from 'src/app/MentalService/answer.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent  {
  questions: Question[] = [];
  availableAnswers: Answer[] = []; // Déclarez la propriété availableAnswers

  constructor(private questionService: QuestionService ,private answerService: AnswerService) { }

  ngOnInit(): void {
    this.loadQuestions();
    this.loadAvailableAnswers(); // Chargez les réponses disponibles lors de l'initialisation du composant
  }

  loadQuestions(): void {
    this.questionService.findAllQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }

  loadAvailableAnswers(): void {
    // Chargez les réponses disponibles depuis le service
    // Assurez-vous que votre service dispose d'une méthode pour récupérer les réponses disponibles
    this.answerService.findAllAnswers().subscribe(
      (data: Answer[]) => {
        this.availableAnswers = data;
      },
      (error) => {
        console.error('Error loading available answers:', error);
      }
    );
  }

  addAnswerToQuestion(questionId: number, answerId: number): void {
    this.questionService.addAnswerToQuestion(questionId, answerId).subscribe(
      () => {
        console.log('Answer added to question successfully');
        // Rechargez les questions pour refléter les mises à jour
        this.loadQuestions();
      },
      (error) => {
        console.error('Error adding answer to question:', error);
      }
    );
  }

  removeAnswerFromQuestion(questionId: number, answerId: number): void {
    this.questionService.removeAnswerFromQuestion(questionId, answerId).subscribe(
      () => {
        console.log('Answer removed from question successfully');
        // Rechargez les questions pour refléter les mises à jour
        this.loadQuestions();
      },
      (error) => {
        console.error('Error removing answer from question:', error);
      }
    );
  }
}



 

