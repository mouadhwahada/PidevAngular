import { Component, OnInit } from '@angular/core';
import { NutritionTracking } from '../models/NutritionTracking';
import { NutritionTrackingService } from '../services/nutrition-tracking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-nutrition-tracking',
  templateUrl: './list-nutrition-tracking.component.html',
  styleUrls: ['./list-nutrition-tracking.component.css']
})
export class ListNutritionTrackingComponent implements OnInit {

  nutritionTrackingList: NutritionTracking[] = [];

  constructor(private nutritionTrackingService: NutritionTrackingService,private router: Router) { }

  ngOnInit(): void {
    this.getNutritionTrackingList();
  }

  getNutritionTrackingList(): void {
    this.nutritionTrackingService.retrieveNutTracking().subscribe(
      (data: NutritionTracking[]) => {
        this.nutritionTrackingList = data;
      },
      (error: any) => {
        console.error('Error fetching nutrition tracking data:', error);
        // Handle the error here
      }
    );
  }

  deleteNutritionTracking(id: number): void {
    this.nutritionTrackingService.deleteNutritionTracking(id).subscribe(
      () => {
        // Remove the deleted item from the list
        this.nutritionTrackingList = this.nutritionTrackingList.filter(tracking => tracking.idNutTrack !== id);
        console.log('Nutrition tracking deleted successfully.');
      },
      (error: any) => {
        console.error('Error deleting nutrition tracking:', error);
        // Handle the error here
      }
    );
  }
  navigateToEditPage(nutritionTrackingId: number): void {
    this.router.navigate(['/updateNutritiontrack', nutritionTrackingId]);
  }}