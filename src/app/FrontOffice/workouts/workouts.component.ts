import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workoutprogram } from 'src/app/models/workoutprogram.model';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit{
  workouts: Workoutprogram[] = [];

  constructor(private workoutProgramService: WorkoutprogramService,private router:Router) { }

  ngOnInit(): void {
    this.workoutProgramService.getWorkoutProgramsByNonUserId(1).subscribe({
      next: (data) => this.workouts = data,
      error: (err) => console.error('Error fetching workouts:', err)
    });
  }
  navigateToExerciseDays(workoutId: number): void {
    this.router.navigate(['/exercise-days', workoutId]);
  }
  assignWorkoutToUser(idUser: number, idWorkout: number): void {
    this.workoutProgramService.assignUserToWorkout(idUser, idWorkout).subscribe({
      next: () => console.log(`Workout ${idWorkout} assigned to user ${idUser}`),
      error: (error) => console.error('Error assigning workout:', error)
    });
  }
  
}

