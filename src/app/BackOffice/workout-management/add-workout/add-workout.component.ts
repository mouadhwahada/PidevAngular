import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent implements OnInit{
  addWorkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutprogramService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addWorkoutForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      targetGroup: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addWorkoutForm.valid) {
      this.workoutService.createWorkoutprogram(this.addWorkoutForm.value).subscribe({
        
        next: (workout) => {
          console.log('Workout added successfully', workout);
          this.router.navigate(['/Admin/ManageWorkout']);
        },
        error: (error) => {
          console.error('There was an error adding the workout', error);
        }
      });
    }
  }

  
}
