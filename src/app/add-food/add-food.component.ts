import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from '../models/Food';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
  foodForm!: FormGroup; // Utilisation de l'initialisation par défaut avec le ! après le type

  constructor(private fb: FormBuilder, private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      namefood: ['', [Validators.required, Validators.maxLength(100)]], // Max length of 100 characters
      calories_per_serving: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      protein_per_serving: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      carbohydrates_per_Serving: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      fat_per_Serving: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      fiber_per_Serving: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      vitamins_per_Serving: ['', Validators.required], // Required field
      minerals_per_Serving: ['', Validators.required], // Required field
      nuttrack: ['']
    });
  }

  addFood(): void {
    if (this.foodForm.valid) {
      const newFood: Food = this.foodForm.value;
      this.foodService.addFood(newFood).subscribe(
        () => {
          console.log('Food added successfully');
          alert('Food added successfully.'); // Afficher une alerte lorsque l'ajout est réussi
          this.foodForm.reset();
        },
        (error: any) => {
          console.error('Error adding food:', error);
          alert('Error adding food. Please try again.'); // Afficher une alerte en cas d'erreur
        }
      );
    } else {
      alert('Please fill out all required fields and ensure that input values are valid.');
    }
  }

  cancelAdd(): void {
    this.foodForm.reset();
  }
}






