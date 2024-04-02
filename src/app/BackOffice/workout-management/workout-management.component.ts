import { Component, OnInit, ViewChild } from '@angular/core';
import { Workoutprogram } from 'src/app/models/workoutprogram.model';
import {MatTableDataSource} from '@angular/material/table';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workout-management',
  templateUrl: './workout-management.component.html',
  styleUrls: ['./workout-management.component.css']
})
export class WorkoutManagementComponent implements OnInit{
  dataSource!:MatTableDataSource<Workoutprogram>;
  displayedColumns:string[]=['name','description','duration','targetGroup','category','actions'];
  @ViewChild(MatSort, {static:true}) sort!:MatSort;
  constructor(private workoutService:WorkoutprogramService,private router: Router){}
  ngOnInit(): void {
    this.loadWorkoutPrograms();
  }
  loadWorkoutPrograms():void{
    this.workoutService.getAllWorkoutprogram().subscribe(workouts=>{
      this.dataSource=new MatTableDataSource(workouts);
      this.dataSource.sort=this.sort;
    })
  }
  applyFilter(event:Event ){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    
  }
  addWorkout() {
    this.router.navigate(['/Admin/AddWorkout']);
  }
  editWorkout(workout: Workoutprogram) {
    this.router.navigate(['/Admin/UpdateWorkout', workout.id_workout]);
  }
  
  deleteWorkout(idWorkout: number) {
    if(confirm('Are you sure you want to delete this workout?')) {
      this.workoutService.deleteWorkoutprogram(idWorkout).subscribe({
        next: () => {
          console.log('Workout deleted successfully');
          this.loadWorkoutPrograms(); 
        },
        error: (error) => {
          console.error('There was an error deleting the workout', error);
        }
      });
    }
  }

}