import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NutritionalGoal } from '../models/NutritionalGoal';
import { NutritionalGoalService } from '../services/nutritional-goal.service';

@Component({
  selector: 'app-list-nutritional-goal',
  templateUrl: './list-nutritional-goal.component.html',
  styleUrls: ['./list-nutritional-goal.component.css']
})
export class ListNutritionalGoalComponent implements OnInit {
  goals: NutritionalGoal[] = [];
  dataSource: MatTableDataSource<NutritionalGoal> = new MatTableDataSource<NutritionalGoal>();
  displayedColumns: string[] = ['duration', 'goal', 'weight_goal', 'height','weight','actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private goalService: NutritionalGoalService) { }

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.goalService.retrieveAllNutGoals().subscribe(
      (goals: NutritionalGoal[]) => {
        this.goals = goals;
        this.dataSource = new MatTableDataSource<NutritionalGoal>(this.goals);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Error retrieving goals:', error);
      }
    );
  }

  goToUpdatePage(nutritionalGoalId: number): void {
    this.router.navigate(['/updateNutritionalGoal', nutritionalGoalId]);
  }

  deleteGoal(goal: NutritionalGoal): void {
    this.goalService.deletegoal(goal.idNGoal).subscribe(
      () => {
        console.log('Goal deleted successfully');
        this.loadGoals();
      },
      (error: any) => {
        console.error('Error deleting goal:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

