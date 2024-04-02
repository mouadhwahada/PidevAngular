import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/MentalService/question.service';
import { Answer } from 'src/app/mentalModels/AnswerModel';
import { Question } from 'src/app/mentalModels/Question';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  questions: Question[] = [];
  questionForm!: FormGroup;
  selectedQuestion: Question | null = null;
  selectedAnswers: Answer[] = [];
  dataSource: MatTableDataSource<Question> = new MatTableDataSource<Question>();
  displayedColumns: string[] = ['charQ', 'textQ', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.findAllQuestions().subscribe(
      questions => {
        this.dataSource.data = questions;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('An error occurred while fetching questions:', error);
      }
    );
  }

  deleteQuestion(question: Question): void {
    this.questionService.deleteQuestion(question.idQuestion).subscribe(
      () => {
        console.log('Question deleted successfully');
        this.loadQuestions();
      },
      (error: any) => {
        console.error('Error deleting question', error);
      }
    );
  }
  showQuestionDetails(question: Question): void {
    this.selectedQuestion = question;
    this.questionService.findAnswersForQuestion(question.idQuestion).subscribe(
      (answers: Answer[]) => {
        this.selectedAnswers = answers;
        this.openQuestionModal(); // Ouvrir le modal après avoir chargé les réponses
      },
      error => {
        console.error('Error fetching answers:', error);
      }
    );
  }
  openQuestionModal(){
    const modelDiv = document.getElementById('QuestionModal');
    if(modelDiv!=null){
      modelDiv.style.display = 'block';
    }
  }
  closeQuestionModal(){
    const modelDiv = document.getElementById('QuestionModal');
    if(modelDiv!=null){
      modelDiv.style.display = 'none';
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
}





   





