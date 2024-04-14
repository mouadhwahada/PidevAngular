import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseDay } from 'src/app/models/exercise-day.model';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  addExerciseForm!: FormGroup;
  selectedFile!: File;
  exerciseDays!: ExerciseDay[];

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private fileService: FileService,
    private exerciseDayService: ExerciseDayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addExerciseForm = this.fb.group({
      namexercise: ['', Validators.required],
      sets: ['', [Validators.required, Validators.min(1)]],
      reps: ['', [Validators.required, Validators.min(1)]],
      repo: ['', Validators.required],
      duration: ['', Validators.required],
      image: [''],
      exerciseDay: ['', Validators.required]
    });
    this.loadExerciseDays();
  }
  loadExerciseDays(): void {
    this.exerciseDayService.getAllExerciseDays().subscribe({
      next: (days) => this.exerciseDays = days,
      error: (err) => console.error('Error loading exercise days:', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.addExerciseForm.valid) {
      if (this.selectedFile) {
        this.fileService.uploadFile(this.selectedFile).subscribe(response => {
          const filename = response.split(': ')[1];
          console.log(filename); 
  
          this.addExerciseForm.patchValue({ image: filename });
          this.createExercise(filename);
        });
      } else {
        this.createExercise(null);
      }
    }
  }
  

createExercise(imageFilename: string | null): void {
  const exerciseData = {
      ...this.addExerciseForm.value,
      image: imageFilename,
      exerciseDay:null
  };

  const selectedDayId = this.addExerciseForm.value.exerciseDay; // ID of the ExerciseDay

  // Use addExerciseToDay service to submit exercise
  this.exerciseService.addExerciseToDay(exerciseData, selectedDayId).subscribe({
      next: () => {
          console.log('Exercise added to day successfully');
          this.router.navigate(['/Admin/ManageExercise']);
      },
      error: (error) => {
          console.error('There was an error adding the exercise to the day', error);
      }
  });
}

}