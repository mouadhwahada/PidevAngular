import { Component } from '@angular/core';
import { AnswerService } from 'src/app/MentalService/answer.service';
import { Answer } from 'src/app/mentalModels/AnswerModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  answers: Answer[] = [];
  dataSource: MatTableDataSource<Answer> = new MatTableDataSource<Answer>();
  displayedColumns: string[] = ['textAnswer', 'score', 'actions'];
  answerss!: MatTableDataSource<Answer>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredAnswers: Answer[] = [];

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.loadAnswers();
  }

  loadAnswers(): void {
    this.answerService.findAllAnswers().subscribe(
      answers => {
        this.dataSource.data = answers;
        this.dataSource.paginator = this.paginator; // Assurez-vous que le paginator est correctement initialisé
      },
      error => {
        console.error('An error occurred while fetching answers:', error);
      }
    );
  }

  deleteAnswer(answer: Answer): void {
    this.answerService.deleteAnswer(answer.idAnswer).subscribe(
      () => {
        console.log('Answer deleted successfully');
        this.loadAnswers();
      },
      (error: any) => {
        console.error('Error deleting answer', error);
      }
    );
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
 

}
