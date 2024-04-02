import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DailyCalorieServiceService {
  private dailyCalorieGoal: number = 0;

  constructor() { }

  setDailyCalorieGoal(calorieGoal: number): void {
    this.dailyCalorieGoal = calorieGoal;
  }

  getDailyCalorieGoal(): number {
    return this.dailyCalorieGoal;
  }

}
