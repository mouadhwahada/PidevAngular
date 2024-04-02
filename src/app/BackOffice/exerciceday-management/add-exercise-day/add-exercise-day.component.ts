import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseDay } from 'src/app/models/exercise-day.model';
import { Workoutprogram } from 'src/app/models/workoutprogram.model';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';

@Component({
  selector: 'app-add-exercise-day',
  templateUrl: './add-exercise-day.component.html',
  styleUrls: ['./add-exercise-day.component.css']
})
export class AddExerciseDayComponent implements OnInit{
  addExerciseDayForm!: FormGroup;
  workoutPrograms!: Workoutprogram[]; // Assume this gets populated from a service

  constructor(
    private fb: FormBuilder,
    private exerciseDayService: ExerciseDayService,
    private router: Router,
    private workoutProgramService: WorkoutprogramService,
  ) {}

  ngOnInit(): void {
    this.addExerciseDayForm = this.fb.group({
      date: ['', Validators.required],
      dayNumber: ['', [Validators.required, Validators.min(1)]],
      totalDuration: ['', [Validators.required, Validators.min(1)]],
      completed: [false],
      workoutProgram: ['', Validators.required]
    });
    this.loadWorkoutPrograms();

  }
  loadWorkoutPrograms(): void {
    this.workoutProgramService.getAllWorkoutprogram().subscribe({
      next: (workoutPrograms) => {
        this.workoutPrograms = workoutPrograms;
      },
      error: (error) => {
        console.error('Error occurred while fetching workout programs:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.addExerciseDayForm.valid) {
      const exerciseDay: ExerciseDay = {
        ...this.addExerciseDayForm.value,
        workoutProgram: null 
      };
      const selectedWorkoutId = this.addExerciseDayForm.value.workoutProgram;
      console.log(selectedWorkoutId);
      this.exerciseDayService.addExerciseDayToWorkout(exerciseDay, selectedWorkoutId).subscribe({
        next: () => {
          console.log('Exercise Day added successfully');
          this.router.navigate(['/Admin/ManageExerciceDay']);
        },
        error: (error) => {
          console.error('There was an error adding the Exercise Day', error);
        }
      });
    }
  }
}
