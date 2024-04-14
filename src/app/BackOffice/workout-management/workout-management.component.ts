import { Component, OnInit, ViewChild } from '@angular/core';
import { Workoutprogram } from 'src/app/models/workoutprogram.model';
import {MatTableDataSource} from '@angular/material/table';
import { WorkoutprogramService } from 'src/app/services/workoutprogram.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-workout-management',
  templateUrl: './workout-management.component.html',
  styleUrls: ['./workout-management.component.css']
})
export class WorkoutManagementComponent implements OnInit{
  dataSource!:MatTableDataSource<Workoutprogram>;
  displayedColumns:string[]=['name','description','duration','targetGroup','category','actions'];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private workoutService:WorkoutprogramService,private router: Router){}
  ngOnInit(): void {
    this.loadWorkoutPrograms();
  }
  loadWorkoutPrograms():void{
    this.workoutService.getAllWorkoutprogram().subscribe(workouts=>{
      this.dataSource=new MatTableDataSource(workouts);
      this.dataSource.paginator = this.paginator;
    })
  }
  sortData(column:string,direction:string):void{
    
    this.dataSource.data.sort((a:any,b:any)=>{
      let valueA=a[column];
      let valueB=b[column];
      if(valueA<valueB){
        return direction ==='asc'?-1:1;
      }else if(valueA>valueB){
        return direction ==='asc'?1:-1;
      }
      return 0;
    })
    this.dataSource.data=[...this.dataSource.data];

  }
  applyFilter(event:Event ){
    const filterValue= (event.target as HTMLInputElement).value.trim().toLowerCase();
    if(filterValue===''){
      this.loadWorkoutPrograms();
    }else{
      this.workoutService.getAllWorkoutprogram().subscribe(workouts=>{
        const filtredData=workouts.filter(workout=>{
          return workout.name.toLowerCase().includes(filterValue) || 
          workout.description.toLowerCase().includes(filterValue) ||
          workout.duration.toString().includes(filterValue) ||
          workout.targetGroup.includes(filterValue)||
          workout.category.toLowerCase().includes(filterValue) 
          ;
        });
        this.dataSource=new MatTableDataSource(filtredData);
      })
    }
    
    
    
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