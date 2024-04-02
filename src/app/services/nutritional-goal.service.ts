import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NutritionalGoal } from '../models/NutritionalGoal';

@Injectable({
  providedIn: 'root'
})
export class NutritionalGoalService {

  private baseUrl: string = 'http://localhost:8070';

  constructor(private http:HttpClient) { }


  addNutritionalGoal(NutritionaGoal:NutritionalGoal): Observable<NutritionalGoal> {
    return this.http.post<NutritionalGoal>(this.baseUrl + '/createNutritionalGoal', NutritionaGoal);
  }
  retrieveAllNutGoals():Observable<NutritionalGoal[]> {
    return this.http.get<NutritionalGoal[]>(this.baseUrl + '/getAllnutgoal');
  }
  deletegoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteNutritionalGoal/${id}`);
  }
  getNutritionalGoalById(nutritionalGoalId: number): Observable<NutritionalGoal> {
    return this.http.get<NutritionalGoal>(`${this.baseUrl}/findNutrionalGoal/${nutritionalGoalId}`);
  }

  // Méthode pour mettre à jour un objectif nutritionnel
  updateNutritionalGoal(nutritionalGoalId: number, updatedNutritionalGoal: NutritionalGoal): Observable<NutritionalGoal> {
    return this.http.put<NutritionalGoal>(`${this.baseUrl}/updateNutrionalGoal/${nutritionalGoalId}`, updatedNutritionalGoal);
  }

  getNutritionalGoalByDailyCalorie(dailyCalorieGoal: number): Observable<NutritionalGoal> {
    return this.http.get<NutritionalGoal>(`${this.baseUrl}/daily-calorie/${dailyCalorieGoal}`);
  }
 
  getNutritionalGoalForTracking(trackingId: number): Observable<NutritionalGoal> {
    return this.http.get<NutritionalGoal>(`/nutritionalGoals/tracking/${trackingId}`);
  }
  getDailyCalorieGoalForTracking(trackingId: number): Observable<NutritionalGoal> {
    return this.http.get<NutritionalGoal>(`${this.baseUrl}/tracking/${trackingId}/dailyCalorieGoal`);
  }
  calculateDailyCalorieGoal(weight: number, height: number, goal: string, duration: number): Observable<number> {
    const url = `${this.baseUrl}/calculateDailyCalorieGoal`;
    let params = new HttpParams()
      .set('weight', weight.toString())
      .set('height', height.toString())
      .set('goal', goal)
      .set('duration', duration.toString());
    return this.http.post<number>(url, {}, { params: params });
  }


  
}
