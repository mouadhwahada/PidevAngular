import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseDay } from 'src/app/models/exercise-day.model';
import { Workoutprogram } from 'src/app/models/workoutprogram.model';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';

@Component({
  selector: 'app-update-exercise-day',
  templateUrl: './update-exercise-day.component.html',
  styleUrls: ['./update-exercise-day.component.css']
})
export class UpdateExerciseDayComponent {
  updateExerciseDayForm!: FormGroup;
  workoutPrograms!: Workoutprogram[];
  exerciseDayId!: number;

  constructor(
    private fb: FormBuilder,
    private exerciseDayService: ExerciseDayService,
    private workoutProgramService: WorkoutprogramService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exerciseDayId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadWorkoutPrograms();
    this.loadExerciseDayData();
  }

  initializeForm(): void {
    this.updateExerciseDayForm = this.fb.group({
      date: ['', Validators.required],
      dayNumber: ['', [Validators.required, Validators.min(1)]],
      totalDuration: ['', [Validators.required, Validators.min(1)]],
      completed: [false],
      workoutProgram: ['', Validators.required]
    });
  }

  loadWorkoutPrograms(): void {
    this.workoutProgramService.getAllWorkoutprogram().subscribe({
      next: (programs) => this.workoutPrograms = programs,
      error: (err) => console.error('Error loading workout programs:', err)
    });
  }

  loadExerciseDayData(): void {
    this.exerciseDayService.getExerciseDayById(this.exerciseDayId).subscribe({
      next: (exerciseDay) => {
        this.updateExerciseDayForm.patchValue({
          ...exerciseDay,
          workoutProgram: exerciseDay.workoutProgram?.id_workout 
        });
      },
      error: (err) => console.error('Error loading exercise day:', err)
    });
  }
  

  onSubmit(): void {
    if (this.updateExerciseDayForm.valid) {
      const updatedExerciseDay: ExerciseDay = {
        ...this.updateExerciseDayForm.value,
        workoutProgram: null ,
        id: this.exerciseDayId
      };
      const selectedWorkoutId = this.updateExerciseDayForm.value.workoutProgram;
      console.log(selectedWorkoutId);
      this.exerciseDayService.addExerciseDayToWorkout(updatedExerciseDay, selectedWorkoutId).subscribe({
        next: () => {
          console.log('Exercise Day updated successfully');
          this.router.navigate(['/Admin/ManageExerciceDay']);
        },
        error: (error) => {
          console.error('There was an error adding the Exercise Day', error);
        }
      });
    }
  }
}
