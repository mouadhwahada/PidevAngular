import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'http://localhost:8070/exercises'; 

  constructor(private http: HttpClient) {}

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.baseUrl, exercise);
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(this.baseUrl, exercise);
  }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl);
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.baseUrl}/${id}`);
  }

  addExerciseToDay(exercise: Exercise, exerciseDayId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/addExerciseToDay/${exerciseDayId}`, exercise);
}

  getExercisesByExerciseDayId(id: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/exercise-day/${id}`);
  }
  areAllExercisesCompletedForDay(userId: number, exerciseDayId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/are-all-completed/${userId}/${exerciseDayId}`);
  }
}
