import { Answer } from "./AnswerModel";
import { Quiz } from "./QuizModel";

export class Question {
    idQuestion!: number;
    charQ!: String;
    textQ!: String;
    answerList!: Answer[];
    
    
}