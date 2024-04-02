import { Component, OnInit, ViewChild } from '@angular/core';
import { ExerciseDay } from 'src/app/models/exercise-day.model';
import { MatTableDataSource } from '@angular/material/table';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';

@Component({
  selector: 'app-exerciceday-management',
  templateUrl: './exerciceday-management.component.html',
  styleUrls: ['./exerciceday-management.component.css']
})
export class ExercicedayManagementComponent implements OnInit {
  dataSource!: MatTableDataSource<ExerciseDay>;
  displayedColumns: string[] = ['workoutName', 'date', 'dayNumber', 'completed', 'totalDuration', 'actions'];

  workoutName!:string;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private exerciseDayService: ExerciseDayService,
    private workoutService: WorkoutprogramService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExerciseDays();
  }

  loadExerciseDays(): void {
    this.exerciseDayService.getAllExerciseDays().subscribe(exerciseDays => {
     
      exerciseDays.forEach(ed => {
        this.workoutName = ed.workoutProgram?.name || 'Unknown';
      });
      this.dataSource = new MatTableDataSource(exerciseDays);
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error occurred while fetching exercise days:', error);
     
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addExerciseDay(): void {
    this.router.navigate(['/Admin/AddExerciseDay']);
  }

  editExerciseDay(id: number): void {
    this.router.navigate(['/Admin/UpdateExerciseDay',id]);
  }

  deleteExerciseDay(id: number): void {
    if(confirm('Are you sure you want to delete this exercise day?')) {
      this.exerciseDayService.deleteExerciseDay(id).subscribe(() => {
        console.log('Exercise day deleted successfully');
        this.loadExerciseDays(); 
      }, error => {
        console.error('There was an error deleting the exercise day:', error);
        
      });
    }
  }
}
