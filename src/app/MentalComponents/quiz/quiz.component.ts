import { Component } from '@angular/core';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Question } from 'src/app/mentalModels/Question';
import { Quiz } from 'src/app/mentalModels/QuizModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizzes: Quiz[] =[];
  questionsWithAnswers!: Question[];
  selectedQuiz: Quiz | null = null; 
  currentQuestionIndex: number = 0;
  selectedAnswerId: number | null = null;
  selectedAnswerIds: number[] = [];
  showResultFlag: boolean = false;
  quizScore: number = 0.0;
  scoreDescription: string = '';
  loading: boolean = false;
  showLoading: boolean = false;
  showCountdown: boolean = true;
  countdownNumber: number = 3;

  dataSource: MatTableDataSource<Quiz> = new MatTableDataSource<Quiz>();
  displayedColumns: string[] = ['titleQuiz', 'topicQuiz', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  



  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuizzes();
    
  }

  loadQuizzes(): void {
    this.quizService.findAllQuizzes().subscribe(
      quizzes => {
        this.dataSource.data = quizzes;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('An error occurred while fetching quizzes:', error);
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
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
 
}

