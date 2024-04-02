import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseDay } from 'src/app/models/exercise-day.model';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.css']
})
export class UpdateExerciseComponent implements OnInit {
  updateExerciseForm!: FormGroup;
  selectedFile!: File;
  exerciseId!: number;
  exerciseDays!: ExerciseDay[];

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private fileService: FileService,
    private exerciseDayService: ExerciseDayService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exerciseId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadExerciseData();
    this.loadExerciseDays();
  }
  loadExerciseDays(): void {
    this.exerciseDayService.getAllExerciseDays().subscribe({
      next: (days) => this.exerciseDays = days,
      error: (err) => console.error('Error loading exercise days:', err)
    });
  }

  initializeForm(): void {
    this.updateExerciseForm = this.fb.group({
      namexercise: ['', Validators.required],
      sets: ['', [Validators.required, Validators.min(1)]],
      reps: ['', [Validators.required, Validators.min(1)]],
      repo: ['', Validators.required],
      duration: ['', Validators.required],
      image: [''],
      exerciseDay: ['', Validators.required]
    });
  }

  loadExerciseData(): void {
    this.exerciseService.getExerciseById(this.exerciseId).subscribe({
      next: (exercise) => {
        this.updateExerciseForm.patchValue({
          ...exercise,
          exerciseDay: exercise.exerciseDay?.id 
        });
      },
      error: (error) => console.error('Error fetching exercise:', error)
    });
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.updateExerciseForm.valid) {
      // Extracting image filename
      const filename = this.selectedFile ? this.selectedFile.name : null;
  
      // Building the exercise data object
      const exerciseData = {
        ...this.updateExerciseForm.value,
        id_Exercice: this.exerciseId,
        image: filename,
        exerciseDay:null // Include the image filename
      };
  
      // Extracting selected Exercise Day ID
      const selectedDayId = this.updateExerciseForm.value.exerciseDay;
      console.log(exerciseData)
      // Updating the exercise data and assigning to a new ExerciseDay
      this.exerciseService.addExerciseToDay(exerciseData, selectedDayId).subscribe({
        next: () => {
          console.log('Exercise updated and assigned to day successfully');
          this.router.navigate(['/Admin/ManageExercise']);
        },
        error: (error) => {
          console.error('Error updating the exercise and assigning to day', error);
        }
      });
    }
  }
  

  
  
  
}
