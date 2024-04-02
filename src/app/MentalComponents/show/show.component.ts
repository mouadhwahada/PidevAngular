import { Component } from '@angular/core';
import { QuestionService } from 'src/app/MentalService/question.service';
import { Answer } from 'src/app/mentalModels/AnswerModel';
import { Question } from 'src/app/mentalModels/Question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Quiz } from 'src/app/mentalModels/QuizModel';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent  {
  quizResults: { title: string, score: number }[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    // Récupérer les résultats du quiz depuis le service quizService
    this.getQuizResults();
  }

  getQuizResults(): void {
    this.quizResults = this.quizService.getQuizResults();
  }
}



 

