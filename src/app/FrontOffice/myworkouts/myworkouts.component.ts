import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseDay } from 'src/app/models/exercise-day.model';
import { Exercise } from 'src/app/models/exercise.model';
import { Workoutprogram } from 'src/app/models/workoutprogram.model';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';
import { forkJoin, map, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-myworkouts',
  templateUrl: './myworkouts.component.html',
  styleUrls: ['./myworkouts.component.css']
})
export class MyworkoutsComponent implements OnInit{
  workouts: Workoutprogram[] = [];
  progress: number = 0;

  constructor(private workoutProgramService: WorkoutprogramService,private exerciseService: ExerciseService, private exerciseDayService: ExerciseDayService,private router:Router) { }

  ngOnInit(): void {
    this.workoutProgramService.getWorkoutProgramsByUserId(1).subscribe({
      
        next: (data) => {
          this.workouts = data;
          this.updateWorkoutsProgress();
        },
      error: (err) => console.error('Error fetching workouts:', err)
    });
  }
  navigateToExerciseDays(workoutId: number): void {
    this.router.navigate(['/my-exercise-days', workoutId]);
  }updateWorkoutsProgress(): void {
    // Créer un tableau d'observables pour chaque programme d'entraînement
    const observables = this.workouts.map(workout => {
      return this.exerciseDayService.getExerciseDaysByWorkoutId(workout.id_workout).pipe(
        switchMap(days => {
          const totalDays = days.length;
          let completedDays = 0;
  
          // Créer un tableau d'observables pour chaque jour d'exercice
          const dayObservables = days.map(day => {
            return this.exerciseService.areAllExercisesCompletedForDay(1, day.id);
          });
  
          // Utiliser forkJoin pour attendre que tous les observables se terminent
          return forkJoin(dayObservables).pipe(
            tap(results => {
              // Compter les jours d'exercice terminés
              completedDays = results.filter(result => result).length;
            }),
            map(() => {
              // Calculer la progression et l'assigner au programme d'entraînement
              if (totalDays !== 0) {
                workout.progress = Math.floor((completedDays / totalDays) * 100);
              } else {
                workout.progress = 0;
              }
            })
          );
        })
      );
    });
  
    // Utiliser forkJoin pour attendre que toutes les requêtes se terminent
    forkJoin(observables).subscribe(() => {
      // Une fois que toutes les requêtes sont terminées, la progression est mise à jour
    });
  }
}