import { Component } from '@angular/core';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {
  constructor(private foodService: FoodService) { }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0] as File;
    this.importExcel(selectedFile);
  }

  importExcel(file: File): void {
    if (file) {
      this.foodService.importExcel(file).subscribe(
        (response) => {
          console.log('Excel file uploaded successfully:', response);
          alert('Excel file uploaded successfully.');
        },
        (error) => {
          console.error('Failed to upload Excel file:', error);
          alert('Failed to upload Excel file. Please try again.');
        }
      );
    } else {
      alert('Please select a file to upload.');
    }
  }
}








