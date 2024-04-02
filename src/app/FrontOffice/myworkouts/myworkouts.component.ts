import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workoutprogram } from 'src/app/models/workoutprogram.model';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';

@Component({
  selector: 'app-myworkouts',
  templateUrl: './myworkouts.component.html',
  styleUrls: ['./myworkouts.component.css']
})
export class MyworkoutsComponent implements OnInit{
  workouts: Workoutprogram[] = [];

  constructor(private workoutProgramService: WorkoutprogramService,private router:Router) { }

  ngOnInit(): void {
    this.workoutProgramService.getWorkoutProgramsByUserId(1).subscribe({
      next: (data) => this.workouts = data,
      error: (err) => console.error('Error fetching workouts:', err)
    });
  }
  navigateToExerciseDays(workoutId: number): void {
    this.router.navigate(['/my-exercise-days', workoutId]);
  }

}
