import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { BodyFrontComponent } from './FrontOffice/body-front/body-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { NavBarFrontComponent } from './FrontOffice/nav-bar-front/nav-bar-front.component';
import {HttpClientModule} from '@angular/common/http';
import { WorkoutManagementComponent } from './BackOffice/workout-management/workout-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AddWorkoutComponent } from './BackOffice/workout-management/add-workout/add-workout.component';
import { UpdateWorkoutComponent } from './BackOffice/workout-management/update-workout/update-workout.component';
import { ExercicedayManagementComponent } from './BackOffice/exerciceday-management/exerciceday-management.component';
import { AddExerciseDayComponent } from './BackOffice/exerciceday-management/add-exercise-day/add-exercise-day.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateExerciseDayComponent } from './BackOffice/exerciceday-management/update-exercise-day/update-exercise-day.component';
import { ExerciseManagementComponent } from './BackOffice/exercise-management/exercise-management.component';
import { AddExerciseComponent } from './BackOffice/exercise-management/add-exercise/add-exercise.component';
import { UpdateExerciseComponent } from './BackOffice/exercise-management/update-exercise/update-exercise.component';
import { WorkoutsComponent } from './FrontOffice/workouts/workouts.component';
import { ExercisedaysComponent } from './FrontOffice/exercisedays/exercisedays.component';
import { ExerciseComponent } from './FrontOffice/exercise/exercise.component';
import { MyworkoutsComponent } from './FrontOffice/myworkouts/myworkouts.component';
import { MyexercisesDayComponent } from './FrontOffice/myexercises-day/myexercises-day.component';
import { StartExerciseComponent } from './FrontOffice/start-exercise/start-exercise.component';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    FooterBackComponent,
    AllTemplateFrontComponent,
    BodyFrontComponent,
    FooterFrontComponent,
    NavBarFrontComponent,
    WorkoutManagementComponent,
    AddWorkoutComponent,
    UpdateWorkoutComponent,
    ExercicedayManagementComponent,
    AddExerciseDayComponent,
    UpdateExerciseDayComponent,
    ExerciseManagementComponent,
    AddExerciseComponent,
    UpdateExerciseComponent,
    WorkoutsComponent,
    ExercisedaysComponent,
    ExerciseComponent,
    MyworkoutsComponent,
    MyexercisesDayComponent,
    StartExerciseComponent
   
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
