import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseProgress } from '../models/exercise-progress.model';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseProgressService {

  private apiUrl = 'http://localhost:8070/exerciseprogress'; 

  constructor(private http: HttpClient) { }

  addExerciseProgress(exerciseProgress: ExerciseProgress, idUser: number, idExercise: number): Observable<ExerciseProgress> {
    return this.http.post<ExerciseProgress>(`${this.apiUrl}/${idUser}/${idExercise}`, exerciseProgress);
  }

  updateExerciseProgress(exerciseProgress: ExerciseProgress): Observable<ExerciseProgress> {
    return this.http.put<ExerciseProgress>(`${this.apiUrl}`, exerciseProgress);
  }

  deleteExerciseProgress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllExerciseProgress(): Observable<ExerciseProgress[]> {
    return this.http.get<ExerciseProgress[]>(this.apiUrl);
  }

  getExerciseProgressById(id: number): Observable<ExerciseProgress> {
    return this.http.get<ExerciseProgress>(`${this.apiUrl}/${id}`);
  }

  markExerciseAsCompleted(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, {});
  }
  markExerciseAsCompleted2(userId: number, exerciseId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/markCompleted/${userId}/${exerciseId}`, null);
  }

  getCompletedExercises(userId: number, idworkout: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/completedExercises/${userId}/${idworkout}`);
  }
  
}

