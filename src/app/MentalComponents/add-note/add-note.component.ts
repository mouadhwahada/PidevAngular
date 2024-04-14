import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/MentalService/note.service';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Note } from 'src/app/mentalModels/Note';
import { Quiz } from 'src/app/mentalModels/QuizModel';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  pieChart: any;
  criticalLevelCount: number = 0;
  attentionRequiredCount: number = 0;
  goodStateCount: number = 0;

  constructor(private http: HttpClient , private noteService: NoteService) { }

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    this.noteService.getStatisticsOfNotes().subscribe(
      (data: number[]) => {
        this.showPieChart(data);
      },
      (error: any) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }
  
  showPieChart(data: number[]): void {
    const labels = ['Critical Level', 'Attention Required', 'Good State'];
    const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'];
  
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Statistics of Notes',
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  
  

}
