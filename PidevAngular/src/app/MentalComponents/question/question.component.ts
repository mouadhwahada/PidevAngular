import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/MentalService/question.service';
import { Question } from 'src/app/mentalModels/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  questions: Question[] =[];
  questionForm!: FormGroup;
  selectedQuestion: Question | null = null;
  constructor(private questionService: QuestionService, private router:Router) { }

  ngOnInit(): void {
    this.loadQuestions();
  }


  loadQuestions(): void {
    this.questionService.findAllQuestions().subscribe(
      questions => {
        this.questions = questions;
      },
      error => {
        console.error('An error occurred while fetching questions:', error);
        // Gérer les erreurs ici
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


   
}




