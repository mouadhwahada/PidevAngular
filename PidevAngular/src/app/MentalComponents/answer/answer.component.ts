import { Component } from '@angular/core';
import { AnswerService } from 'src/app/MentalService/answer.service';
import { Answer } from 'src/app/mentalModels/AnswerModel';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {

  answers: Answer[] =[];
  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.loadAnswers();
  }

  loadAnswers(): void {
    this.answerService.findAllAnswers().subscribe(
      answers => {
        this.answers = answers;
      },
      error => {
        console.error('An error occurred while fetching questions:', error);
        // Gérer les erreurs ici
      }
    );
  }
  deleteAnswer(answer: Answer): void {
    this.answerService.deleteAnswer(answer.idAnswer).subscribe(
      () => {
        console.log('Question deleted successfully');
        this.loadAnswers();
      },
      (error: any) => {
        console.error('Error deleting question', error);
      }
    );
  }
}
