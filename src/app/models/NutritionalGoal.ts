import { NutritionTracking } from "./NutritionTracking";

export interface NutritionalGoal {
  idNGoal: number;
  userId?:number;
  duration: number;
  height: number;
 weight: number;
  goal: string;
  weight_goal: number;
  daily_calorie_goal?: number; // Cette propriété n'est pas obligatoire car elle est marquée comme @Transient dans l'entité Java
  // Si vous avez une entité User, sinon supprimez cette ligne
  nuttrackingList?: NutritionTracking[]; // Si vous avez une entité NutritionTracking, sinon supprimez cette ligne
}
