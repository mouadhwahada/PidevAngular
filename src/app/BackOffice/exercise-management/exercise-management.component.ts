import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/services/file.service';
import { ExerciseDayService } from 'src/app/services/exercise-day.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-exercise-management',
  templateUrl: './exercise-management.component.html',
  styleUrls: ['./exercise-management.component.css']
})
export class ExerciseManagementComponent implements OnInit {
  dataSource!: MatTableDataSource<Exercise>;
  displayedColumns: string[] = ['name', 'sets', 'reps', 'repo', 'duration', 'image', 'exerciseDay', 'actions'];

  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private exerciseService: ExerciseService,
    private fileService: FileService,
    private exerciseDayService: ExerciseDayService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.exerciseService.getAllExercises().subscribe(exercises => {
      this.dataSource = new MatTableDataSource(exercises);
  
      // If exerciseDay data isn't included in exercises, fetch and map it
      this.exerciseDayService.getAllExerciseDays().subscribe(exerciseDays => {
        exercises.forEach(exercise => {
          const exerciseDay = exerciseDays.find(day => day.id === exercise.exerciseDay?.id);
          if (exerciseDay) {
            exercise.exerciseDay = exerciseDay;
          } else {
            console.error(`No exercise day found for exercise ID: ${exercise.id_Exercice}`);
            // Optionally, set a default exerciseDay or handle this case appropriately
          }
        });
        this.dataSource.data = exercises; // Refresh data source
      });
  
      
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error('Error occurred while fetching exercises:', error);
    });
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
      this.loadExercises();
    }else{
      this.exerciseService.getAllExercises().subscribe(exercices=>{
        const filtredData=exercices.filter(exercice=>{
          return exercice.namexercise.toLowerCase().includes(filterValue) || 
          exercice.duration.toString().includes(filterValue) ||
          exercice.sets.toString().includes(filterValue) ||
          exercice.reps.toString().includes(filterValue) 
          
         
          
          ;
        });
        this.dataSource=new MatTableDataSource(filtredData);
      })
    }
  
  }
  getImageUrl(filename: string): string {
    return `http://localhost:8070/files/get-image/${filename}`;
  }



  addExercise(): void {
    this.router.navigate(['/Admin/AddExercise']);
  }

  editExercise(id: number): void {
    this.router.navigate(['/Admin/UpdateExercise', id]);
  }

  deleteExercise(id: number): void {
    if(confirm('Are you sure you want to delete this exercise?')) {
      this.exerciseService.deleteExercise(id).subscribe(() => {
        console.log('Exercise deleted successfully');
        this.loadExercises();
      }, error => {
        console.error('There was an error deleting the exercise:', error);
      });
    }
  }
}
