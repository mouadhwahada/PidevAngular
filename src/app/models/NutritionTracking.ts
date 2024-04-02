import { Food } from "./Food";
import { NutritionalGoal } from "./NutritionalGoal";

export class NutritionTracking {
    idNutTrack!: number;
    dateNut!: string;
    total_calories!: number;
    quantity?:number;
    nutritiongoal!: NutritionalGoal;
    consumedFoods!: Food[];
  userId: any;
 
}
  