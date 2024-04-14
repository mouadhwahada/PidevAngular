import { ExerciseDay } from "./exercise-day.model";

export class Workoutprogram {
    constructor(
        public id_workout:number,
        public name:string,
        public description:string,
        public duration:number,
        public targetGroup:string,
        public category:string,
        public exerciseDays: ExerciseDay[],
       public progress: number
    ){}
}
