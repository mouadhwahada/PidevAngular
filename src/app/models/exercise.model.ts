import { ExerciseDay } from "./exercise-day.model";

export class Exercise {
    completed: any;
    constructor(
        public id_Exercice: number,
        public namexercise:string,
        public sets:number,
        public reps:number,
        public repo:number,
        public duration:number,
        public image:string,
        public exerciseDay?: ExerciseDay
    ){}
}
