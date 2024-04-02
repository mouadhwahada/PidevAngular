import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  foods: Food[] = [];
  dataSource: MatTableDataSource<Food> = new MatTableDataSource<Food>();
  displayedColumns: string[] = ['namefood', 'calories_per_serving', 'protein_per_serving', 'carbohydrates_per_Serving', 'fat_per_Serving', 'fiber_per_Serving', 'vitamins_per_Serving', 'minerals_per_Serving','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private router: Router, private foodService: FoodService) { }

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    this.foodService.retrieveFood().subscribe(
      (foods: Food[]) => {
        this.dataSource.data = foods;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Error retrieving foods:', error);
      }
    );
  }

  goToUpdatePage(food: Food): void {
    this.router.navigate(['/updateFood', food.idFood]);
  }
  
  deleteFood(food: Food): void {
    this.foodService.deleteFood(food.idFood).subscribe(
      () => {
        console.log('Food deleted successfully');
        // Réactualisez la liste des aliments après la suppression
        this.loadFoods();
      },
      (error: any) => {
        console.error('Error deleting food:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}


