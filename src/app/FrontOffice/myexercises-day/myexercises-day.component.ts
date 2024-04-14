import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseDay } from 'src/app/models/exercise-day.model';
import { ExerciseProgress } from 'src/app/models/exercise-progress.model';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';
import { ExerciseProgressService } from 'src/app/services/exercise-progress.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Observable } from 'rxjs';
import { ExerciseCompletionService } from 'src/app/services/exercise-completion';
@Component({
  selector: 'app-myexercises-day',
  templateUrl: './myexercises-day.component.html',
  styleUrls: ['./myexercises-day.component.css']
})
export class MyexercisesDayComponent implements OnInit {
  exerciseDays: ExerciseDay[] = [];
  exercises: Exercise[] = [];
  userId: number = 1; 
  completedExercises: Exercise[] = []; 


  constructor(
    private route: ActivatedRoute,
    private exerciseDayService: ExerciseDayService,
    private exerciseService: ExerciseService,
    private exerciseProgressService: ExerciseProgressService,
    private router: Router,
  
  ) {}

  ngOnInit(): void {
    const workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchCompletedExercises(workoutId);
    this.fetchExerciseDays(workoutId);
  }

  fetchCompletedExercises(workoutId: number): void {
    this.exerciseProgressService.getCompletedExercises(this.userId, workoutId)
      .subscribe(completedExercises => {
        console.log('Completed exercises:', completedExercises); // Afficher les exercices terminés récupérés
        this.completedExercises = completedExercises;
      
      });
  }
  
  fetchExerciseDays(workoutId: number): void {
    this.exerciseDayService.getExerciseDaysByWorkoutId(workoutId).subscribe(days => {
      console.log('Exercise days:', days); // Afficher les jours d'exercice récupérés
      this.exerciseDays = days;
      this.exerciseDays.forEach(day => {
        this.exerciseService.getExercisesByExerciseDayId(day.id).subscribe(exercises => {
          console.log('Exercises for day', day.id, ':', exercises); // Afficher les exercices pour chaque jour d'exercice
          day.exercises = exercises;
        });
      });
    });
  }

  startExercise(dayNumber: number, exerciseId: number): void {
    if (dayNumber >= 1) {
      this.exerciseService.areAllExercisesCompletedForDay(this.userId, dayNumber - 1).subscribe(areCompleted => {
        if (!areCompleted) {
          alert('Please complete all exercises of the previous day!');
          return;
        }
        this.router.navigate(['/start-exercise', exerciseId]);
        const newProgress = new ExerciseProgress(0, new Date(), false);
        this.exerciseProgressService.addExerciseProgress(newProgress, this.userId, exerciseId).subscribe({
          next: progress => console.log('Exercise Progress started:', progress),
          error: error => console.error('Error starting exercise progress:', error)
        });
        console.log('Starting exercise:', exerciseId);
      });
    } else {
      // Logic to start exercise
      console.log('Starting exercise:', exerciseId);
    }
  }

  isExerciseCompleted(exerciseId: number): boolean {
    return this.completedExercises.some(exercise => exercise.id_Exercice === exerciseId);
  }

  getImageUrl(filename: string): string {
    return `http://localhost:8070/files/get-image/${filename}`;
  }
}