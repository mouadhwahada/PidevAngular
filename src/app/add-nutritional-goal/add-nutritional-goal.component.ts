import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NutritionalGoal } from '../models/NutritionalGoal';
import { NutritionalGoalService } from '../services/nutritional-goal.service';
import { DailyCalorieServiceService } from '../services/daily-calorie-service.service';
import { UserService } from '../services/user.service'; // Importer le service d'utilisateur
import { NutritionTrackingService } from '../services/nutrition-tracking.service'; // Importer le service de suivi nutritionnel

@Component({
  selector: 'app-add-nutritional-goal',
  templateUrl: './add-nutritional-goal.component.html',
  styleUrls: ['./add-nutritional-goal.component.css']
})
export class AddNutritionalGoalComponent implements OnInit {
  nutritionalGoalForm!: FormGroup;
  goalOptions: string[] = ['Lose weight', 'Maintain weight', 'Gain weight'];

  constructor(
    private fb: FormBuilder,
    private nutritionalGoalService: NutritionalGoalService,
    private dailyCalorieService: DailyCalorieServiceService,
    private userService: UserService, // Injecter le service d'utilisateur
    private nutritionTrackingService: NutritionTrackingService, // Injecter le service de suivi nutritionnel
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nutritionalGoalForm = this.fb.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      weight_goal: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      Duration: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      goal: ['', Validators.required]
    });
  }

  addNutritionalGoal(): void {
    if (this.nutritionalGoalForm.valid) {
      const { height, weight, weight_goal, Duration, goal } = this.nutritionalGoalForm.value;

      // Récupérer l'ID de l'utilisateur à partir du service d'utilisateur
      const userId = this.userService.getUserId();

      // Utiliser l'ID de l'utilisateur dans la création de l'objectif nutritionnel
      if (userId) {
        this.nutritionalGoalService.calculateDailyCalorieGoal(weight, height, goal, Duration).subscribe(
          (dailyCalorieGoal: number) => {
            const newNutritionalGoal: NutritionalGoal = {
              idNGoal: 0,
              userId: userId, // Utiliser l'ID de l'utilisateur
              duration: Duration,
              height,
              weight,
              goal,
              weight_goal,
              daily_calorie_goal: dailyCalorieGoal
            };

            this.nutritionalGoalService.addNutritionalGoal(newNutritionalGoal).subscribe(
              (addedGoal: NutritionalGoal) => {
                console.log('Nutritional Goal added successfully:', addedGoal);
                this.dailyCalorieService.setDailyCalorieGoal(dailyCalorieGoal);

                // Après avoir ajouté l'objectif nutritionnel, naviguer vers la page de suivi associée
                this.router.navigate(['/addTracking', userId]);
              },
              (error) => {
                console.error('Error adding nutritional goal:', error);
              }
            );
          },
          (error: any) => {
            console.error('Error calculating daily calorie goal:', error);
          }
        );
      } else {
        console.error('User ID is not available.');
      }
    } else {
      alert('Please fill out all required fields and ensure that input values are valid.');
    }
  }

  cancelAdd(): void {
    this.nutritionalGoalForm.reset();
  }
}







