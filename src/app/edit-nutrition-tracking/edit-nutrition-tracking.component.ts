import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NutritionTracking } from '../models/NutritionTracking';
import { NutritionTrackingService } from '../services/nutrition-tracking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-nutrition-tracking',
  templateUrl: './edit-nutrition-tracking.component.html',
  styleUrls: ['./edit-nutrition-tracking.component.css']
})
export class EditNutritionTrackingComponent implements OnInit {
  updateNutritionTrackingForm!: FormGroup;
  nutritionTrackingId!: number;
  nutritionTracking!: NutritionTracking;

  constructor(
    private formBuilder: FormBuilder,
    private nutritionTrackingService: NutritionTrackingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateNutritionTrackingForm = this.formBuilder.group({
      dateNut: ['', Validators.required],
      total_calories: ['', Validators.required],
      // Add other form controls as needed
    });
  
    this.route.params.subscribe(params => {
      const oid = params['id'];
      if (oid) {
        this.nutritionTrackingId = +oid; // Assurez-vous de convertir l'ID en nombre si nécessaire
        this.getNutritionTracking(); // Appelez ici la méthode pour récupérer le nutrition tracking
      } else {
        console.error('Nutrition tracking ID is undefined');
        // Gérer l'erreur, par exemple, rediriger l'utilisateur vers une page d'erreur.
      }
    });
  } 

  getNutritionTracking(): void {
    this.nutritionTrackingService.getNutritionTrackingById(this.nutritionTrackingId).subscribe(
      (data: NutritionTracking) => {
        this.nutritionTracking = data;
        this.updateNutritionTrackingForm.patchValue({
          dateNut: data.dateNut,
          total_calories: data.total_calories,
          // Patch other form controls as needed
        });
      },
      (error: any) => {
        console.error('Error fetching nutrition tracking data:', error);
        // Handle the error here
      }
    );
  }

  updateNutritionTracking(): void {
    if (this.updateNutritionTrackingForm.valid) {
      // Construct updated NutritionTracking object from form values
      const updatedNutritionTracking: NutritionTracking = {
        idNutTrack: this.nutritionTracking.idNutTrack,
        ...this.updateNutritionTrackingForm.value
      };
  
      this.nutritionTrackingService.updateNutritionTrack(this.nutritionTrackingId, updatedNutritionTracking).subscribe(
        () => {
          console.log('Nutrition tracking updated successfully.');
          // Redirect to the list page after successful update
          this.router.navigate(['/showtrack']);
        },
        (error: any) => {
          console.error('Error updating nutrition tracking:', error);
          // Handle the error here
        }
      );
    } else {
      console.error('Invalid form data. Cannot update nutrition tracking.');
      // Handle the case where form data is invalid
    }
  }
  
}


