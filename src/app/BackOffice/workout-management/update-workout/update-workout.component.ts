import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Workoutprogram } from 'src/app/models/workoutprogram.model';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';

@Component({
  selector: 'app-update-workout',
  templateUrl: './update-workout.component.html',
  styleUrls: ['./update-workout.component.css']
})
export class UpdateWorkoutComponent implements OnInit{
  updateWorkoutForm!: FormGroup;
  workoutId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutprogramService
  ) {}

  ngOnInit(): void {
    this.workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.updateWorkoutForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      targetGroup: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.loadWorkoutData();
  } 

  loadWorkoutData(): void {
    this.workoutService.getWorkoutprogramById(this.workoutId).subscribe({
      next: (workout: Workoutprogram) => {
        this.updateWorkoutForm.patchValue(workout);
      },
      error: (error) => {
        console.error('Error fetching workout data', error);
      }
    });
  }

  onSubmit(): void {
    if (this.updateWorkoutForm.valid) {
      const updatedWorkout: Workoutprogram = {
        ...this.updateWorkoutForm.value,
        id_workout: this.workoutId 
      };
      this.workoutService.updateWorkoutprogram(updatedWorkout).subscribe({
        next: () => {
          console.log('Workout updated successfully');
          this.router.navigate(['/Admin/ManageWorkout']);
        },
        error: (error) => {
          console.error('There was an error updating the workout', error);
        }
      });
    }
  }
}
