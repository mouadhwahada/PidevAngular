import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { WorkoutManagementComponent } from './BackOffice/workout-management/workout-management.component';
import { AddWorkoutComponent } from './BackOffice/workout-management/add-workout/add-workout.component';
import { UpdateWorkoutComponent } from './BackOffice/workout-management/update-workout/update-workout.component';
import { ExercicedayManagementComponent } from './BackOffice/exerciceday-management/exerciceday-management.component';
import { AddExerciseDayComponent } from './BackOffice/exerciceday-management/add-exercise-day/add-exercise-day.component';
import { UpdateExerciseDayComponent } from './BackOffice/exerciceday-management/update-exercise-day/update-exercise-day.component';
import { ExerciseManagementComponent } from './BackOffice/exercise-management/exercise-management.component';
import { AddExerciseComponent } from './BackOffice/exercise-management/add-exercise/add-exercise.component';
import { UpdateExerciseComponent } from './BackOffice/exercise-management/update-exercise/update-exercise.component';
import { WorkoutsComponent } from './FrontOffice/workouts/workouts.component';
import { BodyFrontComponent } from './FrontOffice/body-front/body-front.component';
import { ExercisedaysComponent } from './FrontOffice/exercisedays/exercisedays.component';
import { ExerciseComponent } from './FrontOffice/exercise/exercise.component';
import { MyworkoutsComponent } from './FrontOffice/myworkouts/myworkouts.component';
import { MyexercisesDayComponent } from './FrontOffice/myexercises-day/myexercises-day.component';
import { StartExerciseComponent } from './FrontOffice/start-exercise/start-exercise.component';

const routes: Routes = [
  {
    path: "Admin",
    component: AllTemplateBackComponent,
    children: [
      {
        path: "ManageWorkout",
        component: WorkoutManagementComponent
      },
      {
        path: "AddWorkout",
        component: AddWorkoutComponent
      },
      {
        path: "UpdateWorkout/:id",
        component: UpdateWorkoutComponent
      },
      {
        path: "ManageExerciceDay",
        component: ExercicedayManagementComponent
      },
      {
        path: "AddExerciseDay",
        component: AddExerciseDayComponent
      },
      {
        path: "UpdateExerciseDay/:id",
        component: UpdateExerciseDayComponent
      },
      {
        path: "ManageExercise",
        component: ExerciseManagementComponent
      },
      {
        path: "AddExercise",
        component: AddExerciseComponent
      },
      {
        path: "UpdateExercise/:id",
        component: UpdateExerciseComponent
      },
      
    ]
  },
  
  {path:"",
  component: AllTemplateFrontComponent,
  children:[
    {
      path: "workouts",
      component:WorkoutsComponent
    },
    {
      path: "myworkouts",
      component:MyworkoutsComponent
    },
    {
      path:"home",
      component:BodyFrontComponent
    }
    ,
    {
      path:"exercise-days/:id",
      component:ExercisedaysComponent
    },
    {
      path:"my-exercise-days/:id",
      component:MyexercisesDayComponent
    }
    ,
    {
      path:"exercises/:id",
      component:ExerciseComponent
    },
    {
      path:"start-exercise/:id",
      component:StartExerciseComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
