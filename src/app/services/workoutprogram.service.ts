import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workoutprogram } from '../models/workoutprogram.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutprogramService {
  private baseUrl='http://localhost:8070';

  constructor(private http:HttpClient) { }

  createWorkoutprogram(workoutprogram:Workoutprogram):Observable<Workoutprogram>{
    return this.http.post<Workoutprogram>(`${this.baseUrl}/creatWorkoutprogramm`,workoutprogram);
  }
  updateWorkoutprogram(workoutprogram:Workoutprogram):Observable<Workoutprogram>{
    return this.http.put<Workoutprogram>(`${this.baseUrl}/updateWorkoutprogram`,workoutprogram);
  }
  deleteWorkoutprogram(id_workout:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteprogram/${id_workout}`);
  }
  getAllWorkoutprogram():Observable<Workoutprogram[]>{
    return this.http.get<Workoutprogram[]>(`${this.baseUrl}/getAllWorkoutprogramm`);
  }
  getWorkoutprogramById(id_workout:number):Observable<Workoutprogram>{
    return this.http.get<Workoutprogram>(`${this.baseUrl}/getWorkoutprogramById/${id_workout}`);
  }
  assignUserToWorkout(idUser:number,idWorkout:number):Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/${idUser}/${idWorkout}`,null);
  }
  getWorkoutProgramsByUserId(idUser: number): Observable<Workoutprogram[]> {
    return this.http.get<Workoutprogram[]>(`${this.baseUrl}/user/${idUser}`);
  }
  getWorkoutProgramsByNonUserId(idUser: number): Observable<Workoutprogram[]> {
    return this.http.get<Workoutprogram[]>(`${this.baseUrl}/nonuser/${idUser}`);
  }
}
