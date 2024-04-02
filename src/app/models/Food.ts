import { NutritionTracking } from "./NutritionTracking";

export class Food {
  idFood!: number;
  namefood!: string;
  calories_per_serving!: number;
  protein_per_serving!: number;
  carbohydrates_per_Serving!: number;
  fat_per_Serving!: number;
  fiber_per_Serving!: number;
  vitamins_per_Serving!: string;
  minerals_per_Serving!: number;
  nuttrack!: NutritionTracking;
}

