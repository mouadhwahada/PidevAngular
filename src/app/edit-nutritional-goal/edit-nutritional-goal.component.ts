import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NutritionalGoal } from '../models/NutritionalGoal';
import { NutritionalGoalService } from '../services/nutritional-goal.service';

@Component({
  selector: 'app-edit-nutritional-goal',
  templateUrl: './edit-nutritional-goal.component.html',
  styleUrls: ['./edit-nutritional-goal.component.css']
})
export class EditNutritionalGoalComponent implements OnInit {
  updateNutritionalGoalForm!: FormGroup;
  nutritionalGoalId!: number;
  nutritionalGoal!: NutritionalGoal;

  constructor(private formBuilder: FormBuilder, private nutritionalGoalService: NutritionalGoalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.updateNutritionalGoalForm = this.formBuilder.group({
      daily_calorie_goal: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      daily_protein_goal: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      daily_carbohydrates_goal: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      goal: ['', Validators.required],
      weight_goal: ['', [Validators.required, Validators.min(0)]], // Must be a positive number
      Duration: ['', [Validators.required, Validators.min(1), Validators.max(365)]] // Must be between 1 and 365
    });

    this.route.params.subscribe(params => {
      const oid = params['id'];
      if (oid) {
        this.nutritionalGoalId = +oid;
        this.getNutritionalGoal();
      } else {
        console.error('Nutritional goal ID is undefined');
      }
    });
  }

  getNutritionalGoal(): void {
    this.nutritionalGoalService.getNutritionalGoalById(this.nutritionalGoalId).subscribe(
      (nutritionalGoal: NutritionalGoal) => {
        this.nutritionalGoal = nutritionalGoal;
        this.updateNutritionalGoalForm.patchValue({
     
          daily_protein_goal: nutritionalGoal.height,
          daily_carbohydrates_goal: nutritionalGoal.weight,
          goal: nutritionalGoal.goal,
          weight_goal: nutritionalGoal.weight_goal,
          Duration: nutritionalGoal.duration
        });
      },
      error => {
        console.error('Error fetching nutritional goal data:', error);
      }
    );
  }

  updateNutritionalGoal(): void {
    if (this.updateNutritionalGoalForm.valid) {
      const updatedNutritionalGoal: NutritionalGoal = {
        idNGoal: this.nutritionalGoal.idNGoal,
        ...this.updateNutritionalGoalForm.value
      };

      this.nutritionalGoalService.updateNutritionalGoal(updatedNutritionalGoal.idNGoal, updatedNutritionalGoal).subscribe(
        (updatedNutritionalGoal: NutritionalGoal) => {
          console.log('Nutritional goal updated successfully:', updatedNutritionalGoal);
          // Show success message or redirect user to another page
        },
        (error: any) => {
          console.error('Error updating nutritional goal:', error);
          alert('Error updating nutritional goal. Please try again.');
        }
      );
    } else {
      console.error('Invalid form data. Cannot update nutritional goal.');
      alert('Invalid form data. Please fill in all required fields.');
    }
  }

}

