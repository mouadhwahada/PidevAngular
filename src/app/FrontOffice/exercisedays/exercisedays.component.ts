import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseDay } from 'src/app/models/exercise-day.model';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercisedays',
  templateUrl: './exercisedays.component.html',
  styleUrls: ['./exercisedays.component.css']
})
export class ExercisedaysComponent implements OnInit{
  exerciseDays: ExerciseDay[] = [];
  exercises:Exercise[]=[];
  progress: number = 0;

  constructor(
    private route: ActivatedRoute,
    private exerciseDayService: ExerciseDayService,
    private exerciseService: ExerciseService
  ) {}      

  ngOnInit(): void {
    const workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.exerciseDayService.getExerciseDaysByWorkoutId(workoutId).subscribe(days => {
      this.exerciseDays = days;
      this.exerciseDays.forEach(day => {
        this.exerciseService.getExercisesByExerciseDayId(day.id).subscribe(exercises => {
          day.exercises = exercises; 
         
        });
      });
    });
  }

  getImageUrl(filename: string): string {
    return `http://localhost:8070/files/get-image/${filename}`;
  }
}