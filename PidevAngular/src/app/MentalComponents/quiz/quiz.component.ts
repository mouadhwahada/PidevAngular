import { Component } from '@angular/core';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Quiz } from 'src/app/mentalModels/QuizModel';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizzes: Quiz[] =[];
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.findAllQuizzes().subscribe(
      quizzes => {
        this.quizzes = quizzes;
      },
      error => {
        console.error('An error occurred while fetching questions:', error);
        // Gérer les erreurs ici
      }
    );
  }
  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz.idQuiz).subscribe(
      () => {
        console.log('Question deleted successfully');
        this.loadQuizzes();
      },
      (error: any) => {
        console.error('Error deleting question', error);
      }
    );
  }

}
