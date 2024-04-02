import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NutritionTracking } from '../models/NutritionTracking';
import { Observable } from 'rxjs';
import { Food } from '../models/Food';



@Injectable({
  providedIn: 'root'
})
export class NutritionTrackingService {
 
  private baseUrl: string = 'http://localhost:8070';

  constructor(private http: HttpClient) { }
  addNutritionTracking(nutritionTracking: NutritionTracking): Observable<NutritionTracking> {
    return this.http.post<NutritionTracking>(`${this.baseUrl}/createNutritionTrack`, nutritionTracking);
  }

  // Méthode pour supprimer un élément de suivi nutritionnel
  deleteNutritionTracking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteNutritionTrack/${id}`);
  }
  retrieveNutTracking(): Observable<NutritionTracking[]> {
    return this.http.get<NutritionTracking[]>(this.baseUrl + '/getAllnutTrack');
  }
  updateNutritionTrack(id: number, updatedNutTrack: NutritionTracking): Observable<NutritionTracking> {
    return this.http.put<NutritionTracking>(`${this.baseUrl}/updateNutritionTrack/${id}`, updatedNutTrack);
  }
  getNutritionTrackingById(nutritionTrackingId: number): Observable<NutritionTracking> {
    return this.http.get<NutritionTracking>(`${this.baseUrl}/findNutrionTrack/${nutritionTrackingId}`);
  }
  recordFoodIntake(nutritionTrackingId: number, food: Food): Observable<NutritionTracking> {
    return this.http.post<NutritionTracking>(`${this.baseUrl}/${nutritionTrackingId}/food`, food);
  }

  getRemainingCaloriesForTracking(trackingId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/remaining-calories/${trackingId}`);
  }
  getLastNutritionTracking(): Observable<NutritionTracking> {
    return this.http.get<NutritionTracking>(`${this.baseUrl}/lastNutritionTracking`);
  }
  getNutritionTrackingsByNutritionalGoalId(nutritionalGoalId: number): Observable<NutritionTracking[]> {
    const url = `${this.baseUrl}/${nutritionalGoalId}`;
    return this.http.get<NutritionTracking[]>(url);
  }
  }
  


