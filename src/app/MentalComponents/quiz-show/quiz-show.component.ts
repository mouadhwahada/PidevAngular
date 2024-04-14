import { Component } from '@angular/core';
import { QuestionService } from 'src/app/MentalService/question.service';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Question } from 'src/app/mentalModels/Question';
import { Quiz } from 'src/app/mentalModels/QuizModel';

@Component({
  selector: 'app-quiz-show',
  templateUrl: './quiz-show.component.html',
  styleUrls: ['./quiz-show.component.css']
})
export class QuizShowComponent {
  quizzes: Quiz[] = [];
  availableQuestions: Question[] = []; // Déclarez la propriété availableQuestions

  constructor(private quizService: QuizService , private questionService :QuestionService) { }

  ngOnInit(): void {
    this.loadQuizzes();
    this.loadAvailableQuestions(); // Chargez les questions disponibles lors de l'initialisation du composant
  }

  loadQuizzes(): void {
    this.quizService.findAllQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Error loading quizzes:', error);
      }
    );
  }

  loadAvailableQuestions(): void {
    // Chargez les questions disponibles depuis le service
    // Assurez-vous que votre service dispose d'une méthode pour récupérer les questions disponibles
    this.questionService.findAllQuestions().subscribe(
      (data: Question[]) => {
        this.availableQuestions = data;
      },
      (error) => {
        console.error('Error loading available questions:', error);
      }
    );
  }

  addQuestionToQuiz(quizId: number, questionId: number): void {
    this.quizService.addQuestionToQuiz(quizId, questionId).subscribe(
      () => {
        console.log('Question added to quiz successfully');
        // Rechargez les quiz pour refléter les mises à jour
        this.loadQuizzes();
      },
      (error) => {
        console.error('Error adding question to quiz:', error);
      }
    );
  }

  removeQuestionFromQuiz(quizId: number, questionId: number): void {
    this.quizService.removeQuestionFromQuiz(quizId, questionId).subscribe(
      () => {
        console.log('Question removed from quiz successfully');
        // Rechargez les quiz pour refléter les mises à jour
        this.loadQuizzes();
      },
      (error) => {
        console.error('Error removing question from quiz:', error);
      }
    );
  }

}
