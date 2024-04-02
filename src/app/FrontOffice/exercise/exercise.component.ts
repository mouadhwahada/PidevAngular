import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit{
  exercises: Exercise[] = [];
  exerciseDayId!: number;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.exerciseDayId = Number(this.route.snapshot.paramMap.get('id'));
    this.exerciseService.getExercisesByExerciseDayId(this.exerciseDayId).subscribe(data => {
      this.exercises = data;
    });
  }

  getImageUrl(filename: string): string {
    return `http://localhost:8070/files/get-image/${filename}`;
  }
}
