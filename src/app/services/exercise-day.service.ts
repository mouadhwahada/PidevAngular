import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseDay } from '../models/exercise-day.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseDayService {
  private baseUrl = 'http://localhost:8070/exerciseday';

  constructor(private http: HttpClient) {}

  createExerciseDay(exerciseDay: ExerciseDay): Observable<ExerciseDay> {
    return this.http.post<ExerciseDay>(this.baseUrl, exerciseDay);
  }

  updateExerciseDay(exerciseDay: ExerciseDay): Observable<ExerciseDay> {
    return this.http.put<ExerciseDay>(this.baseUrl, exerciseDay);
  }

  deleteExerciseDay(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllExerciseDays(): Observable<ExerciseDay[]> {
    return this.http.get<ExerciseDay[]>(this.baseUrl);
  }

  getExerciseDayById(id: number): Observable<ExerciseDay> {
    return this.http.get<ExerciseDay>(`${this.baseUrl}/${id}`);
  }

  addExerciseDayToWorkout(exerciseDay: ExerciseDay, id: number): Observable<ExerciseDay> {
    return this.http.post<ExerciseDay>(`${this.baseUrl}/${id}`, exerciseDay);
  }

  completeDay(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, null);
  }
  getExerciseDaysByWorkoutId(workoutId: number): Observable<ExerciseDay[]> {
    return this.http.get<ExerciseDay[]>(`${this.baseUrl}/workout/${workoutId}`);
  }
   getExerciseDayProgress(exerciseDayId: number, userId: number): Observable<number> {

    return this.http.get<number>(`${this.baseUrl}/progress/${exerciseDayId}/${userId}`);
  }
}
