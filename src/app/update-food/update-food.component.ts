import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../models/Food';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent implements OnInit {
  updateFoodForm!: FormGroup;
  foodId!: number;
  food!: Food;

  constructor(private formBuilder: FormBuilder, private foodService: FoodService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.updateFoodForm = this.formBuilder.group({
      namefood: ['', Validators.required],
      calories_per_serving: ['', Validators.required],
      protein_per_serving: ['', Validators.required],
      carbohydrates_per_Serving: ['', Validators.required],
      fat_per_Serving: ['', Validators.required],
      fiber_per_Serving: ['', Validators.required],
      vitamins_per_Serving: ['', Validators.required],
      minerals_per_Serving: ['', Validators.required],
      nuttrack: ['']
    });

    this.route.params.subscribe(params => {
      const id = params['foodId']; // Assurez-vous que le nom du paramètre correspond exactement à celui défini dans app-routing.module.ts
      if (!isNaN(id)) {
        this.foodId = id;
        this.getFood();
      } else {
        console.error('Invalid food ID:', id);
        // Gérer l'erreur, par exemple, rediriger l'utilisateur vers une page d'erreur.
      }
    });
    
  }

  getFood(): void {
    this.foodService.getFoodById(this.foodId).subscribe(
      (food: Food) => {
        this.food = food;
        this.updateFoodForm.patchValue({
          namefood: food.namefood,
          calories_per_serving: food.calories_per_serving,
          protein_per_serving: food.protein_per_serving,
          carbohydrates_per_Serving: food.carbohydrates_per_Serving,
          fat_per_Serving: food.fat_per_Serving,
          fiber_per_Serving: food.fiber_per_Serving,
          vitamins_per_Serving: food.vitamins_per_Serving,
          minerals_per_Serving: food.minerals_per_Serving,
          nuttrack: food.nuttrack
        });
      },
      error => {
        console.error('Error fetching food data:', error);
        // Gérer l'erreur
      }
    );
  }

  updateFood(): void {
    if (this.updateFoodForm.valid) {
      const updatedFood: Food = {
        idFood: this.food.idFood, // Préservez l'ID d'origine
        ...this.updateFoodForm.value
      };

      this.foodService.updateFood(updatedFood.idFood, updatedFood).subscribe(
        (updatedFood: Food) => {
          console.log('Food updated successfully:', updatedFood);
          // Afficher un message de réussite ou rediriger l'utilisateur vers une autre page
        },
        (error: any) => {
          console.error('Error updating food:', error);
          // Afficher une alerte en cas d'erreur
          alert('Error updating food. Please try again.');
        }
      );
    } else {
      console.error('Invalid form data. Cannot update food.');
      // Afficher une alerte si les données du formulaire sont invalides
      alert('Invalid form data. Please fill in all required fields.');
    }
  }
}














