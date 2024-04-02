import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FoodComponent } from './Food/food/food.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { UpdateFoodComponent } from './update-food/update-food.component';
import { AddNutritionalGoalComponent } from './add-nutritional-goal/add-nutritional-goal.component';
import { ListNutritionalGoalComponent } from './list-nutritional-goal/list-nutritional-goal.component';
import { EditNutritionalGoalComponent } from './edit-nutritional-goal/edit-nutritional-goal.component';
import { NutritionTrackComponent } from './add-nutrition-tracking/add-nutrition-tracking.component';
import { ListNutritionTrackingComponent } from './list-nutrition-tracking/list-nutrition-tracking.component';
import { EditNutritionTrackingComponent } from './edit-nutrition-tracking/edit-nutrition-tracking.component';
import { ListrackComponent } from './listrack/listrack.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { NutritionComponent } from './nutrition/nutrition.component';
 // Importez votre composant FoodComponent

const routes: Routes = [
  { path: '', component: AllTemplateFrontComponent }, 
  { path: 'admin', component: AllTemplateBackComponent },
  { path: 'foods', component: FoodComponent } ,// Ajoutez cette ligne pour lier FoodComponent à la route 'foods'
  {path:'addFood',component:AddFoodComponent},
  { path: 'updateFood/:foodId', component: UpdateFoodComponent },
  {path:'addnutritiongoal',component:AddNutritionalGoalComponent},
  {path:'showNutgoal',component:ListNutritionalGoalComponent},

  { path: 'updateNutritionalGoal/:id', component:EditNutritionalGoalComponent},
  { path: 'addTracking/:userId', component: NutritionTrackComponent },
  {path:'showtrack', component:ListNutritionTrackingComponent},
  { path: 'updateNutritiontrack/:id', component: EditNutritionTrackingComponent },
  {path:'listtrack/:userId',component:ListrackComponent},
  {path:'nutrition',component:NutritionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

