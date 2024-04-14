import { Exercise } from "./exercise.model";
import { Workoutprogram } from "./workoutprogram.model";

export class ExerciseDay {
    constructor(
        public id:number,
        public dayNumber:number,
        public date:Date,
        public completed:boolean,
        public totalDuration:number,
        public workoutProgram:Workoutprogram,
        public exercises?:Exercise[],
      
    ){}
    

    }


